import { Controller, Post, Get, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SosService } from './sos.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSosDto } from './dto/create-sos.dto';
import { SosResponseDto, SosHistoryResponseDto } from './dto/sos-response.dto';

@ApiTags('SOS')
@Controller('sos')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class SosController {
  constructor(private sosService: SosService) {}

  @Post()
  @ApiOperation({
    summary: 'Activar botón de pánico (SOS)',
    description: 'Registra una alerta SOS con la ubicación actual del usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Alerta SOS creada exitosamente',
    type: SosResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes una renta activa con esta moto',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async createSos(@Req() req, @Body() createSosDto: CreateSosDto) {
    return this.sosService.createSos(req.user.userId, createSosDto);
  }

  @Get('my-alerts')
  @ApiOperation({
    summary: 'Mis alertas SOS',
    description: 'Obtiene todas las alertas SOS del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de alertas SOS',
    type: [SosResponseDto],
  })
  async getMySosAlerts(@Req() req) {
    return this.sosService.getMySosAlerts(req.user.userId);
  }

  @Get('all')
  @ApiOperation({
    summary: 'Todas las alertas SOS (Admin)',
    description: 'Obtiene todas las alertas SOS del sistema (solo administrador)',
  })
  @ApiResponse({
    status: 200,
    description: 'Historial completo de alertas SOS',
    type: SosHistoryResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getAllSosAlerts(@Req() req) {
    // Verificar que es admin
    const user = await this.sosService['prisma'].user.findUnique({
      where: { id: req.user.userId },
      select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
      throw new ForbiddenException('Acceso denegado. Se requieren permisos de administrador.');
    }

    return this.sosService.getAllSosAlerts();
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Resumen de alertas SOS (Admin)',
    description: 'Obtiene un resumen de todas las alertas SOS (solo administrador)',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen de alertas SOS',
    schema: {
      example: {
        total: 10,
        pending: 3,
        resolved: 5,
        cancelled: 2,
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getSosSummary(@Req() req) {
    const user = await this.sosService['prisma'].user.findUnique({
      where: { id: req.user.userId },
      select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
      throw new ForbiddenException('Acceso denegado. Se requieren permisos de administrador.');
    }

    return this.sosService.getSosSummary();
  }

  @Post(':id/resolve')
  @ApiOperation({
    summary: 'Resolver alerta SOS (Admin)',
    description: 'Marca una alerta SOS como resuelta (solo administrador)',
  })
  @ApiResponse({
    status: 200,
    description: 'Alerta SOS resuelta exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  @ApiResponse({
    status: 404,
    description: 'Alerta SOS no encontrada',
  })
  async resolveSosAlert(@Param('id') id: string, @Req() req) {
    const user = await this.sosService['prisma'].user.findUnique({
      where: { id: req.user.userId },
      select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
      throw new ForbiddenException('Acceso denegado. Se requieren permisos de administrador.');
    }

    return this.sosService.resolveSosAlert(id);
  }

  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Cancelar alerta SOS',
    description: 'Cancela una alerta SOS (solo el usuario que la creó)',
  })
  @ApiResponse({
    status: 200,
    description: 'Alerta SOS cancelada exitosamente',
  })
  @ApiResponse({
    status: 403,
    description: 'No tienes permiso para cancelar esta alerta',
  })
  @ApiResponse({
    status: 404,
    description: 'Alerta SOS no encontrada',
  })
  async cancelSosAlert(@Param('id') id: string, @Req() req) {
    return this.sosService.cancelSosAlert(id, req.user.userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Detalle de alerta SOS',
    description: 'Obtiene los detalles de una alerta SOS específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la alerta SOS',
    type: SosResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Alerta SOS no encontrada',
  })
  async getSosAlert(@Param('id') id: string) {
    return this.sosService.getSosAlertById(id);
  }
}