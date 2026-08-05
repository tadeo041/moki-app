import { Module } from '@nestjs/common';
import { FakePaymentService } from './fake-payment.service';
import { FakePaymentController } from './fake-payment.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FakePaymentController],
  providers: [FakePaymentService, PrismaService],
  exports: [FakePaymentService],
})
export class FakePaymentModule {}
