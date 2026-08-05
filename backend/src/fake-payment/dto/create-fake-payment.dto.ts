import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export enum FakePaymentMethodDto {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  DIGITAL_WALLET = 'DIGITAL_WALLET',
}

export class CreateFakePaymentDto {
  @ApiProperty({
    example: 5000,
    description: 'Amount in cents (e.g. 5000 = $50.00)',
  })
  @IsInt()
  @Min(1)
  amount: number;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @ApiPropertyOptional({
    enum: FakePaymentMethodDto,
    default: FakePaymentMethodDto.CREDIT_CARD,
  })
  @IsOptional()
  @IsEnum(FakePaymentMethodDto)
  method?: FakePaymentMethodDto;

  @ApiPropertyOptional({
    example: 'rental_cm0x123456789',
    description: 'Your internal reference (e.g. rentalId)',
  })
  @IsOptional()
  @IsString()
  externalReference?: string;

  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  cardHolderName?: string;

  @ApiPropertyOptional({
    example: '4111111111111111',
    description: 'Card number (will be masked before storing)',
  })
  @IsOptional()
  @IsString()
  cardNumber?: string;

  @ApiPropertyOptional({ example: 'Motorcycle rental – 3 days' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '{"userId":"abc123"}',
    description: 'Any extra JSON metadata you want to store',
  })
  @IsOptional()
  @IsString()
  metadata?: string;

  /**
   * TEST ONLY – force a specific outcome.
   * Pass "decline" to simulate a declined payment.
   */
  @ApiPropertyOptional({
    example: 'decline',
    description: 'Set to "decline" to simulate a failed payment (test mode)',
  })
  @IsOptional()
  @IsString()
  simulateOutcome?: string;
}

export class CreateFakeRefundDto {
  @ApiPropertyOptional({
    example: 2500,
    description: 'Amount to refund in cents; omit for full refund',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  amount?: number;

  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ConfirmFakePaymentDto {
  @ApiProperty({
    example: 'pi_fake_abc123',
    description: 'transactionId returned by POST /fake-payment',
  })
  @IsNotEmpty()
  @IsString()
  transactionId: string;
}
