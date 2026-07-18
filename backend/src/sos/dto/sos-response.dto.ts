import { ApiProperty } from '@nestjs/swagger';

export class SosResponseDto {
  @ApiProperty({ example: 'cm0x123456789' })
  id: string;

  @ApiProperty({ example: 'cm0x987654321' })
  userId: string;

  @ApiProperty({ example: 'cm0x555555555' })
  motorcycleId: string;

  @ApiProperty({ example: 'Yamaha FZ25 2024' })
  motorcycleName: string;

  @ApiProperty({ example: 'Tadeo' })
  userName: string;

  @ApiProperty({ example: 'tadeo@gmail.com' })
  userEmail: string;

  @ApiProperty({ example: 25.6866 })
  latitude: number;

  @ApiProperty({ example: -100.3161 })
  longitude: number;

  @ApiProperty({ example: 'Me siento en peligro' })
  message: string;

  @ApiProperty({ enum: ['PENDING', 'RESOLVED', 'CANCELLED'] })
  status: string;

  @ApiProperty({ example: '2026-07-17T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-07-17T10:30:00Z' })
  resolvedAt: Date;
}

export class SosHistoryResponseDto {
  @ApiProperty({ example: 5 })
  total: number;

  @ApiProperty({ example: 2 })
  pending: number;

  @ApiProperty({ example: 3 })
  resolved: number;

  @ApiProperty({ type: [SosResponseDto] })
  alerts: SosResponseDto[];
}