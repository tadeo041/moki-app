import { ApiProperty } from '@nestjs/swagger';

export class MotorcycleListDto {
  @ApiProperty({ example: 'cm0x123456789' })
  id: string;

  @ApiProperty({ example: 'Yamaha FZ25 2024' })
  name: string;

  @ApiProperty({ example: 150 })
  pricePerHour: number;

  @ApiProperty({ example: 250 })
  cc: number;

  @ApiProperty({ example: 2024 })
  year: number;

  @ApiProperty({ example: 'https://ejemplo.com/moto.jpg' })
  imageUrl: string;
}

export class MotorcycleDetailDto extends MotorcycleListDto {
  @ApiProperty({ enum: ['AVAILABLE', 'RENTED', 'MAINTENANCE'] })
  status: string;

  @ApiProperty({ example: '140 Km/h' })
  maxSpeed: string;

  @ApiProperty({ example: '15,000 Km' })
  mileage: string;

  @ApiProperty({ example: '35 KM/L' })
  consumption: string;

  @ApiProperty({ example: 'Deportiva' })
  type: string;

  @ApiProperty({ example: '2 cilindros' })
  cylinders: string;

  @ApiProperty({ example: 'ABS Doble Canal' })
  brakes: string;

  @ApiProperty({ example: 'Ideal para reparto - 150cc' })
  description: string;
}