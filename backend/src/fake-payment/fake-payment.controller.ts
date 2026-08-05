import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FakePaymentService } from './fake-payment.service';
import { ChargeDto } from './dto/charge.dto';
import { RefundDto } from './dto/refund.dto';

@ApiTags('Fake Payment Gateway')
@Controller('fake-payment')
export class FakePaymentController {
  constructor(private fakePaymentService: FakePaymentService) {}

  @Post('charge')
  @ApiOperation({
    summary: 'Realizar un cobro',
    description:
      'Simula un cobro con tarjeta. Usa el número 4242424242424242 para éxito. ' +
      'Usa 4000000000000002 para simular un rechazo.',
  })
  @ApiResponse({ status: 201, description: 'Cobro procesado (exitoso o fallido)' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async charge(@Body() dto: ChargeDto) {
    return this.fakePaymentService.charge(dto);
  }

  @Post('refund')
  @ApiOperation({
    summary: 'Reembolsar un pago',
    description: 'Reembolsa un pago previamente exitoso. El monto es opcional (reembolso parcial).',
  })
  @ApiResponse({ status: 201, description: 'Reembolso procesado' })
  @ApiResponse({ status: 400, description: 'El pago no se puede reembolsar' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async refund(@Body() dto: RefundDto) {
    return this.fakePaymentService.refund(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar pagos',
    description: 'Retorna todos los pagos registrados, ordenados por fecha de creación.',
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de pagos' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.fakePaymentService.findAll(Number(page) || 1, Number(limit) || 20);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un pago por ID',
    description: 'Retorna el detalle de un pago específico.',
  })
  @ApiResponse({ status: 200, description: 'Detalle del pago' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.fakePaymentService.findOne(id);
  }
}
