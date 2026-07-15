import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new InternalServerErrorException(
        'STRIPE_SECRET_KEY no está configurada en el archivo .env'
      );
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2026-06-24.dahlia',
    });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd', rentalId: string) {
    try {
      // Crear el Payment Intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency,
        metadata: {
          rentalId: rentalId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
        // Confirmar automáticamente con una tarjeta de prueba
        payment_method: 'pm_card_visa',
        confirm: true,
        return_url: 'http://localhost:3000/rentals/confirmation',
      });

      // Actualizar la renta con el paymentIntentId
      await this.prisma.rental.update({
        where: { id: rentalId },
        data: {
          paymentIntentId: paymentIntent.id,
          paymentStatus: paymentIntent.status === 'succeeded' ? 'PAID' : 'PENDING',
          status: paymentIntent.status === 'succeeded' ? 'ACTIVE' : 'PENDING',
        },
      });

      // Si el pago fue exitoso, actualizar la moto
      if (paymentIntent.status === 'succeeded') {
        const rental = await this.prisma.rental.findUnique({
          where: { id: rentalId },
          select: { motorcycleId: true },
        });

        if (rental) {
          await this.prisma.motorcycle.update({
            where: { id: rental.motorcycleId },
            data: { status: 'RENTED' },
          });
        }
      }

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      };
    } catch (error) {
      throw new BadRequestException(`Error creating payment intent: ${error.message}`);
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        return { success: true };
      } else {
        return { success: false, status: paymentIntent.status };
      }
    } catch (error) {
      throw new BadRequestException(`Error confirming payment: ${error.message}`);
    }
  }

  async createRefund(paymentIntentId: string, amount?: number) {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? Math.round(amount * 100) : undefined,
      });

      return refund;
    } catch (error) {
      throw new BadRequestException(`Error creating refund: ${error.message}`);
    }
  }

  async handleWebhook(payload: Buffer, signature: string) {
    try {
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!webhookSecret) {
        throw new InternalServerErrorException(
          'STRIPE_WEBHOOK_SECRET no está configurada en el archivo .env'
        );
      }

      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
        default:
          console.log(`Evento no manejado: ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      throw new BadRequestException(`Webhook Error: ${error.message}`);
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const rental = await this.prisma.rental.findFirst({
      where: { paymentIntentId: paymentIntent.id },
    });

    if (rental) {
      await this.prisma.$transaction([
        this.prisma.rental.update({
          where: { id: rental.id },
          data: {
            paymentStatus: 'PAID',
            status: 'ACTIVE',
          },
        }),
        this.prisma.motorcycle.update({
          where: { id: rental.motorcycleId },
          data: { status: 'RENTED' },
        }),
      ]);
    }
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const rental = await this.prisma.rental.findFirst({
      where: { paymentIntentId: paymentIntent.id },
    });

    if (rental) {
      await this.prisma.rental.update({
        where: { id: rental.id },
        data: {
          paymentStatus: 'FAILED',
          status: 'CANCELLED',
        },
      });
    }
  }
}