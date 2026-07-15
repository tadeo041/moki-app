import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRentalDto } from './dto/create-rental.dto';

@ApiTags('Rentals')
@Controller('rentals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class RentalsController {
  constructor(private rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una renta', 
    description: 'Crea una nueva renta con opciones de servicios y pago' 
  })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Renta creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o moto no disponible',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async createRental(@Req() req, @Body() body: CreateRentalDto) {
    return this.rentalsService.createRental(req.user.userId, body);
  }

  @Post(':id/confirm-payment')
  @ApiOperation({ 
    summary: 'Confirmar pago', 
    description: 'Confirma el pago de una renta usando Stripe' 
  })
  @ApiBody({
    schema: {
      properties: {
        paymentIntentId: { type: 'string', example: 'pi_123456789' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Pago confirmado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el pago',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async confirmPayment(
    @Param('id') id: string,
    @Body() body: { paymentIntentId: string },
  ) {
    return this.rentalsService.confirmRentalPayment(id, body.paymentIntentId);
  }

  @Get('my-rentals')
  @ApiOperation({ 
    summary: 'Mis rentas', 
    description: 'Retorna todas las rentas del usuario autenticado' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de rentas del usuario',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findUserRentals(@Req() req) {
    return this.rentalsService.findUserRentals(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Detalles de una renta', 
    description: 'Retorna información detallada de una renta específica' 
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la renta',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Renta no encontrada',
  })
  async findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ 
    summary: 'Cancelar renta', 
    description: 'Cancela una renta existente' 
  })
  @ApiResponse({
    status: 200,
    description: 'Renta cancelada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'No se puede cancelar la renta',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Renta no encontrada',
  })
  async cancelRental(@Param('id') id: string, @Req() req) {
    return this.rentalsService.cancelRental(id, req.user.userId);
  }
}