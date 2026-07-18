import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MotorcyclesModule } from './motorcycles/motorcycles.module';
import { RentalsModule } from './rentals/rentals.module';
import { StripeModule } from './stripe/stripe.module';
import { AdminModule } from './admin/admin.module';
import { SosModule } from './sos/sos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, MotorcyclesModule, RentalsModule, StripeModule, AdminModule, SosModule],
  providers: [PrismaService],
})
export class AppModule {}