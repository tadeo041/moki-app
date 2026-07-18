import { Module } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SosController],
  providers: [SosService, PrismaService],
  exports: [SosService],
})
export class SosModule {}