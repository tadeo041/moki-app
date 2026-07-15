import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateMotorcycleDto {
  @ApiProperty({
    example: 'Yamaha FZ25 2024',
    description: 'Nombre de la moto',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 150,
    description: 'Precio por hora en dólares',
  })
  @IsNumber()
  @Min(0)
  pricePerHour: number;

  @ApiProperty({
    example: 250,
    description: 'Cilindrada (cc)',
  })
  @IsNumber()
  @Min(50)
  cc: number;

  @ApiProperty({
    example: 2024,
    description: 'Año de la moto',
  })
  @IsNumber()
  @Min(2000)
  @Max(2026)
  year: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500',
    description: 'URL de la imagen',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    example: '140 Km/h',
    description: 'Velocidad máxima',
  })
  @IsString()
  maxSpeed: string;

  @ApiProperty({
    example: '15,000 Km',
    description: 'Kilometraje',
  })
  @IsString()
  mileage: string;

  @ApiProperty({
    example: '35 KM/L',
    description: 'Consumo de combustible',
  })
  @IsString()
  consumption: string;

  @ApiProperty({
    example: 'Deportiva',
    description: 'Tipo de moto',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: '2 cilindros',
    description: 'Número de cilindros',
  })
  @IsString()
  cylinders: string;

  @ApiProperty({
    example: 'ABS Doble Canal',
    description: 'Tipo de frenos',
  })
  @IsString()
  brakes: string;

  @ApiProperty({
    example: 'Ideal para reparto - 150cc',
    description: 'Descripción de la moto',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}