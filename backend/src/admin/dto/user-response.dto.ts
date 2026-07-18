import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'cm0x123456789' })
  id: string;

  @ApiProperty({ example: 'admin@moki.com' })
  email: string;

  @ApiProperty({ example: 'Administrador MOKI' })
  name: string;

  @ApiProperty({ enum: ['USER', 'ADMIN'], example: 'ADMIN' })
  role: string;

  @ApiProperty({ example: '2026-07-17T10:00:00Z' })
  createdAt: Date;
}
