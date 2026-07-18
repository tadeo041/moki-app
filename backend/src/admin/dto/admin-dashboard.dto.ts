import { ApiProperty } from '@nestjs/swagger';

export class DashboardSummaryDto {
  @ApiProperty({ example: 15000 })
  todayRevenue: number;

  @ApiProperty({ example: 45000 })
  weekRevenue: number;

  @ApiProperty({ example: 120000 })
  monthRevenue: number;

  @ApiProperty({ example: 15 })
  availableMotorcycles: number;

  @ApiProperty({ example: 5 })
  rentedMotorcycles: number;

  @ApiProperty({ example: 20 })
  totalMotorcycles: number;

  @ApiProperty({ example: 8 })
  activeRentals: number;

  @ApiProperty({ example: 3 })
  pendingRentals: number;
}

export class MotorcycleLocationDto {
  @ApiProperty({ example: 'cm0x123456789' })
  id: string;

  @ApiProperty({ example: 'Yamaha FZ25 2024' })
  name: string;

  @ApiProperty({ example: 25.6866 })
  latitude: number;

  @ApiProperty({ example: -100.3161 })
  longitude: number;

  @ApiProperty({ enum: ['AVAILABLE', 'RENTED', 'MAINTENANCE'] })
  status: string;

  @ApiProperty({ example: '2026-07-17T10:00:00Z' })
  lastLocationUpdate: Date;

  @ApiProperty({ example: 'Angel Díaz' })
  renterName?: string;

  @ApiProperty({ example: 'angel@email.com' })
  renterEmail?: string;
}

export class UpdateLocationDto {
  @ApiProperty({ example: 25.6866 })
  latitude: number;

  @ApiProperty({ example: -100.3161 })
  longitude: number;
}