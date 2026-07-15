import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ServicesDto {
  @ApiProperty({ 
    example: true, 
    description: 'Incluir kit de seguridad (casco, guantes, chaleco)',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  helmetKit?: boolean;

  @ApiProperty({ 
    example: true, 
    description: 'Incluir seguro (básico, contra daños, completo)',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  insurance?: boolean;

  @ApiProperty({ 
    example: false, 
    description: 'Entrega a domicilio',
    default: false 
  })
  @IsBoolean()
  @IsOptional()
  delivery?: boolean;
}

export class PaymentDto {
  @ApiProperty({ example: 'ANGEL DÍAZ' })
  @IsString()
  cardName: string;

  @ApiProperty({ example: '0000000000000000' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ example: '12/26' })
  @IsString()
  cardExpiry: string;

  @ApiProperty({ example: '123' })
  @IsString()
  cardCVV: string;
}

export class CreateRentalDto {
  @ApiProperty({ example: 'cm0x123456789' })
  @IsString()
  motorcycleId: string;

  @ApiProperty({ example: '2026-07-20T10:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-07-22T10:00:00Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ type: ServicesDto })
  @ValidateNested()
  @Type(() => ServicesDto)
  services: ServicesDto;

  @ApiProperty({ type: PaymentDto })
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}