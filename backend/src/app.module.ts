import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MotorcyclesModule } from './motorcycles/motorcycles.module';
import { RentalsModule } from './rentals/rentals.module';
import { StripeModule } from './stripe/stripe.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, MotorcyclesModule, RentalsModule, StripeModule],
  providers: [PrismaService],
})
export class AppModule {}