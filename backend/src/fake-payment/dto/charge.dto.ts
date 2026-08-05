import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPositive, Length, Matches } from 'class-validator';

export class ChargeDto {
  @ApiProperty({ example: 150.0, description: 'Monto a cobrar' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: 'usd', description: 'Moneda (default: usd)' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: '4242424242424242', description: 'Número de tarjeta (16 dígitos)' })
  @IsString()
  @Matches(/^\d{16}$/, { message: 'cardNumber must be exactly 16 digits' })
  cardNumber: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre en la tarjeta' })
  @IsString()
  cardName: string;

  @ApiProperty({ example: '12/26', description: 'Fecha de vencimiento MM/YY' })
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, { message: 'cardExpiry must be in MM/YY format' })
  cardExpiry: string;

  @ApiProperty({ example: '123', description: 'Código de seguridad CVV' })
  @IsString()
  @Length(3, 4)
  cardCVV: string;

  @ApiPropertyOptional({ example: 'Renta moto XYZ', description: 'Descripción del cobro' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'rental_abc123', description: 'Referencia externa del cobro' })
  @IsOptional()
  @IsString()
  externalRef?: string;

  @ApiPropertyOptional({ description: 'Metadatos adicionales en formato JSON' })
  @IsOptional()
  metadata?: Record<string, any>;
}
