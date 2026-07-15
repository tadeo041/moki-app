import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class RentalsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  async createRental(userId: string, data: any) {
    const { motorcycleId, startDate, endDate, services, payment } = data;
    
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id: motorcycleId },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    if (motorcycle.status !== 'AVAILABLE') {
      throw new BadRequestException('La moto no está disponible');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (totalDays <= 0) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    const totalPrice = totalDays * motorcycle.pricePerHour;

    // Crear la renta
    const rental = await this.prisma.rental.create({
      data: {
        userId,
        motorcycleId,
        startDate: start,
        endDate: end,
        totalDays,
        totalPrice,
        insurance: services?.insurance || false,
        helmetKit: services?.helmetKit || false,
        delivery: services?.delivery || false,
        cardName: payment?.cardName,
        cardNumber: payment?.cardNumber,
        cardExpiry: payment?.cardExpiry,
        cardCVV: payment?.cardCVV,
        status: 'PENDING',
        paymentStatus: 'PENDING',
      },
      include: {
        motorcycle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Crear y confirmar el Payment Intent automáticamente
    const paymentIntent = await this.stripeService.createPaymentIntent(
      totalPrice,
      'usd',
      rental.id
    );

    // Obtener la renta actualizada
    const updatedRental = await this.prisma.rental.findUnique({
      where: { id: rental.id },
      include: {
        motorcycle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return {
      rental: updatedRental,
      paymentIntent,
    };
  }

  async confirmRentalPayment(rentalId: string, paymentIntentId: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id: rentalId },
    });

    if (!rental) {
      throw new NotFoundException('Renta no encontrada');
    }

    if (rental.paymentIntentId !== paymentIntentId) {
      throw new BadRequestException('Payment Intent no coincide con la renta');
    }

    const result = await this.stripeService.confirmPayment(paymentIntentId);

    if (result.success) {
      await this.prisma.$transaction([
        this.prisma.rental.update({
          where: { id: rentalId },
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

      return { success: true, message: 'Pago confirmado y renta activada' };
    } else {
      throw new BadRequestException(`Pago fallido: ${result.status}`);
    }
  }

  async findUserRentals(userId: string) {
    return this.prisma.rental.findMany({
      where: { userId },
      include: {
        motorcycle: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
      include: {
        motorcycle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!rental) {
      throw new NotFoundException('Renta no encontrada');
    }

    return rental;
  }

  async cancelRental(id: string, userId: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException('Renta no encontrada');
    }

    if (rental.userId !== userId) {
      throw new BadRequestException('No tienes permiso para cancelar esta renta');
    }

    if (rental.status === 'COMPLETED') {
      throw new BadRequestException('Esta renta ya no puede ser cancelada');
    }

    if (rental.status === 'CANCELLED') {
      throw new BadRequestException('Esta renta ya está cancelada');
    }

    if (rental.paymentStatus === 'PAID' && rental.paymentIntentId) {
      await this.stripeService.createRefund(rental.paymentIntentId);
    }

    const updatedRental = await this.prisma.rental.update({
      where: { id },
      data: { 
        status: 'CANCELLED',
        paymentStatus: rental.paymentStatus === 'PAID' ? 'REFUNDED' : 'FAILED',
      },
    });

    await this.prisma.motorcycle.update({
      where: { id: rental.motorcycleId },
      data: { status: 'AVAILABLE' },
    });

    return updatedRental;
  }
}