import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService, PrismaService, StripeService],
})
export class RentalsModule {}