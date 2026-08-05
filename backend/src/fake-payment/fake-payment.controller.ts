import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { FakePaymentService } from './fake-payment.service';
import {
  CreateFakePaymentDto,
  CreateFakeRefundDto,
} from './dto/create-fake-payment.dto';

/**
 * FakePaymentController
 *
 * Exposes a mock payment-gateway REST API that external applications can
 * integrate with for testing purposes.  No real money is moved.
 *
 * Base path: /fake-payment
 */
@ApiTags('Fake Payment Gateway')
@Controller('fake-payment')
export class FakePaymentController {
  constructor(private readonly fakePaymentService: FakePaymentService) {}

  // ──────────────────────────────────────────────────────────────────────────
  // POST /fake-payment
  // ──────────────────────────────────────────────────────────────────────────
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Process a payment',
    description: `
Creates and immediately processes a payment transaction.

**Test card numbers**
| Card number          | Result                |
|----------------------|-----------------------|
| 4111 1111 1111 1111  | Approved              |
| 4000 0000 0000 0002  | Declined              |
| 4000 0000 0000 9995  | Insufficient funds    |
| Any other number     | Approved              |

You can also force a decline by passing \`"simulateOutcome": "decline"\`.
    `,
  })
  @ApiBody({ type: CreateFakePaymentDto })
  @ApiResponse({
    status: 201,
    description: 'Payment processed (check `status` field)',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createPayment(@Body() dto: CreateFakePaymentDto) {
    return this.fakePaymentService.createPayment(dto);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // GET /fake-payment
  // ──────────────────────────────────────────────────────────────────────────
  @Get()
  @ApiOperation({
    summary: 'List all payment transactions',
    description:
      'Returns a paginated list of all fake-payment records (useful for admin / testing dashboards).',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Paginated list of transactions' })
  async listPayments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.fakePaymentService.listPayments(page, limit);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // GET /fake-payment/:transactionId
  // ──────────────────────────────────────────────────────────────────────────
  @Get(':transactionId')
  @ApiOperation({
    summary: 'Get payment by transactionId',
    description:
      'Retrieves full details of a payment transaction, including any refunds.',
  })
  @ApiParam({ name: 'transactionId', example: 'clxyz123abc' })
  @ApiResponse({ status: 200, description: 'Payment details' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async getPayment(@Param('transactionId') transactionId: string) {
    return this.fakePaymentService.getPayment(transactionId);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /fake-payment/:transactionId/refund
  // ──────────────────────────────────────────────────────────────────────────
  @Post(':transactionId/refund')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refund a payment',
    description: 'Issues a full or partial refund for an APPROVED payment.',
  })
  @ApiParam({ name: 'transactionId', example: 'clxyz123abc' })
  @ApiBody({ type: CreateFakeRefundDto })
  @ApiResponse({ status: 200, description: 'Refund created' })
  @ApiResponse({
    status: 400,
    description: 'Cannot refund – check payment status',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async refundPayment(
    @Param('transactionId') transactionId: string,
    @Body() dto: CreateFakeRefundDto,
  ) {
    return this.fakePaymentService.refundPayment(transactionId, dto);
  }

  // ──────────────────────────────────────────────────────────────────────────
  // POST /fake-payment/:transactionId/cancel
  // ──────────────────────────────────────────────────────────────────────────
  @Post(':transactionId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cancel a payment',
    description: 'Cancels a PENDING payment (not yet processed).',
  })
  @ApiParam({ name: 'transactionId', example: 'clxyz123abc' })
  @ApiResponse({ status: 200, description: 'Payment cancelled' })
  @ApiResponse({
    status: 400,
    description: 'Cannot cancel – not in PENDING status',
  })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  async cancelPayment(@Param('transactionId') transactionId: string) {
    return this.fakePaymentService.cancelPayment(transactionId);
  }
}
