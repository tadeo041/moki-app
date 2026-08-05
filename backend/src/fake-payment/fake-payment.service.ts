import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateFakePaymentDto,
  CreateFakeRefundDto,
} from './dto/create-fake-payment.dto';

/**
 * FakePaymentService
 *
 * Simulates a payment gateway without hitting any real payment provider.
 * Useful for integration tests and demos with external applications.
 *
 * Behaviour
 * ---------
 * • POST /fake-payment          → creates a PENDING transaction then immediately
 *                                  processes it (APPROVED or DECLINED).
 * • GET  /fake-payment/:id      → retrieve a transaction by transactionId.
 * • POST /fake-payment/:id/refund → creates a refund record and marks the
 *                                  payment as REFUNDED.
 * • POST /fake-payment/:id/cancel → cancels a PENDING payment.
 * • GET  /fake-payment          → list all transactions (admin / testing).
 *
 * Decline rules (test mode)
 * -------------------------
 * The following card numbers are always declined:
 *   4000000000000002  – generic decline
 *   4000000000009995  – insufficient funds
 * Pass simulateOutcome: "decline" in the request body to force a decline
 * regardless of card number.
 */
@Injectable()
export class FakePaymentService {
  private static readonly DECLINED_CARDS = new Set([
    '4000000000000002',
    '4000000000009995',
  ]);

  constructor(private prisma: PrismaService) {}

  // ─────────────────────────────────────────────────────────────────
  // Create & process a payment
  // ─────────────────────────────────────────────────────────────────
  async createPayment(dto: CreateFakePaymentDto) {
    const maskedCard = dto.cardNumber
      ? this.maskCard(dto.cardNumber)
      : undefined;

    // Decide outcome
    const shouldDecline =
      dto.simulateOutcome === 'decline' ||
      (dto.cardNumber
        ? FakePaymentService.DECLINED_CARDS.has(
            dto.cardNumber.replace(/\s/g, ''),
          )
        : false);

    const status = shouldDecline ? 'DECLINED' : 'APPROVED';
    const failureReason = shouldDecline
      ? dto.simulateOutcome === 'decline'
        ? 'Simulated decline (test mode)'
        : 'Card declined by issuer'
      : null;

    const payment = await this.prisma.fakePayment.create({
      data: {
        amount: dto.amount,
        currency: (dto.currency ?? 'USD').toUpperCase(),
        method: dto.method ?? 'CREDIT_CARD',
        status,
        externalReference: dto.externalReference ?? null,
        cardHolderName: dto.cardHolderName ?? null,
        maskedCard: maskedCard ?? null,
        description: dto.description ?? null,
        metadata: dto.metadata ?? null,
        failureReason: failureReason ?? null,
        processedAt: new Date(),
      },
    });

    return {
      success: status === 'APPROVED',
      transactionId: payment.transactionId,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency,
      maskedCard: payment.maskedCard,
      failureReason: payment.failureReason,
      processedAt: payment.processedAt,
      createdAt: payment.createdAt,
    };
  }

  // ─────────────────────────────────────────────────────────────────
  // Retrieve a single payment by transactionId
  // ─────────────────────────────────────────────────────────────────
  async getPayment(transactionId: string) {
    const payment = await this.prisma.fakePayment.findUnique({
      where: { transactionId },
      include: { refunds: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment not found: ${transactionId}`);
    }

    return payment;
  }

  // ─────────────────────────────────────────────────────────────────
  // List all payments (for admin / testing dashboards)
  // ─────────────────────────────────────────────────────────────────
  async listPayments(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [total, payments] = await this.prisma.$transaction([
      this.prisma.fakePayment.count(),
      this.prisma.fakePayment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { refunds: true },
      }),
    ]);

    return { total, page, limit, payments };
  }

  // ─────────────────────────────────────────────────────────────────
  // Refund a payment (full or partial)
  // ─────────────────────────────────────────────────────────────────
  async refundPayment(transactionId: string, dto: CreateFakeRefundDto) {
    const payment = await this.prisma.fakePayment.findUnique({
      where: { transactionId },
      include: { refunds: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment not found: ${transactionId}`);
    }

    if (payment.status !== 'APPROVED') {
      throw new BadRequestException(
        `Cannot refund a payment with status "${payment.status}"`,
      );
    }

    const alreadyRefunded = payment.refunds.reduce(
      (sum, r) => sum + (r.amount ?? payment.amount),
      0,
    );
    const refundAmount = dto.amount ?? payment.amount - alreadyRefunded;

    if (refundAmount <= 0) {
      throw new BadRequestException('Nothing left to refund');
    }

    if (alreadyRefunded + refundAmount > payment.amount) {
      throw new BadRequestException(
        'Refund amount exceeds the original payment',
      );
    }

    const isFullRefund = alreadyRefunded + refundAmount === payment.amount;

    const [refund] = await this.prisma.$transaction([
      this.prisma.fakePaymentRefund.create({
        data: {
          paymentId: payment.id,
          amount: refundAmount,
          reason: dto.reason ?? null,
        },
      }),
      ...(isFullRefund
        ? [
            this.prisma.fakePayment.update({
              where: { id: payment.id },
              data: { status: 'REFUNDED' },
            }),
          ]
        : []),
    ]);

    return {
      success: true,
      refundTransactionId: refund.transactionId,
      refundAmount,
      isFullRefund,
      reason: refund.reason,
    };
  }

  // ─────────────────────────────────────────────────────────────────
  // Cancel a PENDING payment
  // ─────────────────────────────────────────────────────────────────
  async cancelPayment(transactionId: string) {
    const payment = await this.prisma.fakePayment.findUnique({
      where: { transactionId },
    });

    if (!payment) {
      throw new NotFoundException(`Payment not found: ${transactionId}`);
    }

    if (payment.status !== 'PENDING') {
      throw new BadRequestException(
        `Only PENDING payments can be cancelled. Current status: "${payment.status}"`,
      );
    }

    await this.prisma.fakePayment.update({
      where: { id: payment.id },
      data: { status: 'CANCELLED' },
    });

    return { success: true, message: 'Payment cancelled' };
  }

  // ─────────────────────────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────────────────────────
  private maskCard(cardNumber: string): string {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 4) return '****';
    return `**** **** **** ${digits.slice(-4)}`;
  }
}
