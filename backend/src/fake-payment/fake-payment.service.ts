import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChargeDto } from './dto/charge.dto';
import { RefundDto } from './dto/refund.dto';

// Cards that simulate failure when used
const FAILING_CARDS = ['4000000000000002', '4000000000009995', '4000000000000069'];

@Injectable()
export class FakePaymentService {
  constructor(private prisma: PrismaService) {}

  async charge(dto: ChargeDto) {
    const isFailure = FAILING_CARDS.includes(dto.cardNumber);
    const status = isFailure ? 'FAILED' : 'SUCCEEDED';
    const failureReason = isFailure ? 'Your card was declined.' : null;

    const payment = await this.prisma.fakePayment.create({
      data: {
        amount: dto.amount,
        currency: dto.currency ?? 'usd',
        cardNumber: dto.cardNumber,
        cardName: dto.cardName,
        cardExpiry: dto.cardExpiry,
        cardCVV: dto.cardCVV,
        description: dto.description,
        externalRef: dto.externalRef,
        metadata: dto.metadata ?? undefined,
        status,
        failureReason,
      },
    });

    return {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      externalRef: payment.externalRef,
      description: payment.description,
      failureReason: payment.failureReason,
      createdAt: payment.createdAt,
    };
  }

  async refund(dto: RefundDto) {
    const payment = await this.prisma.fakePayment.findUnique({
      where: { id: dto.paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (payment.status !== 'SUCCEEDED') {
      throw new BadRequestException(
        `No se puede reembolsar un pago con estado "${payment.status}"`,
      );
    }

    if (dto.amount && dto.amount > payment.amount) {
      throw new BadRequestException('El monto de reembolso supera el monto original del pago');
    }

    const updated = await this.prisma.fakePayment.update({
      where: { id: dto.paymentId },
      data: {
        status: 'REFUNDED',
        refundedAt: new Date(),
      },
    });

    return {
      id: updated.id,
      status: updated.status,
      amount: dto.amount ?? updated.amount,
      currency: updated.currency,
      refundedAt: updated.refundedAt,
    };
  }

  async findOne(id: string) {
    const payment = await this.prisma.fakePayment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return {
      id: payment.id,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      externalRef: payment.externalRef,
      description: payment.description,
      metadata: payment.metadata,
      failureReason: payment.failureReason,
      refundedAt: payment.refundedAt,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [payments, total] = await Promise.all([
      this.prisma.fakePayment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          status: true,
          amount: true,
          currency: true,
          externalRef: true,
          description: true,
          failureReason: true,
          refundedAt: true,
          createdAt: true,
        },
      }),
      this.prisma.fakePayment.count(),
    ]);

    return { payments, total, page, limit };
  }
}
