import { Controller, Post, Body, Headers, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private prisma: PrismaService,
  ) {}

  @Post('webhook')
  @ApiOperation({ 
    summary: 'Webhook de Stripe', 
    description: 'Endpoint para recibir eventos de Stripe' 
  })
  @ApiResponse({
    status: 200,
    description: 'Webhook procesado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el webhook',
  })
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody;
    return this.stripeService.handleWebhook(rawBody, signature);
  }

  @Post('create-payment-intent')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Crear Payment Intent', 
    description: 'Crea un Payment Intent en Stripe para procesar el pago' 
  })
  @ApiBody({
    schema: {
      properties: {
        rentalId: { type: 'string', example: 'cm0x123456789' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Payment Intent creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error creando el payment intent',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async createPaymentIntent(@Body() body: { rentalId: string }) {
    const rental = await this.prisma.rental.findUnique({
      where: { id: body.rentalId },
    });
    
    if (!rental) {
      throw new BadRequestException('Renta no encontrada');
    }
    
    return this.stripeService.createPaymentIntent(
      rental.totalPrice,
      'usd',
      rental.id
    );
  }
}