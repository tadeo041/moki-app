import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class RefundDto {
  @ApiProperty({ example: 'fpay_abc123', description: 'ID del pago a reembolsar' })
  @IsString()
  paymentId: string;

  @ApiPropertyOptional({ example: 50.0, description: 'Monto a reembolsar (si es parcial)' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;
}
