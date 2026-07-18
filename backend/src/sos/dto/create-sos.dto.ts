import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CreateSosDto {
  @ApiProperty({
    example: 'cm0x123456789',
    description: 'ID de la moto que está rentando',
  })
  @IsString()
  motorcycleId: string;

  @ApiProperty({
    example: 25.6866,
    description: 'Latitud de la ubicación actual',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiProperty({
    example: -100.3161,
    description: 'Longitud de la ubicación actual',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({
    example: 'Me siento en peligro, necesito ayuda',
    description: 'Mensaje adicional (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}