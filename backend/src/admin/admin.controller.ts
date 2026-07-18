import { Controller, Get, Post, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { DashboardSummaryDto, MotorcycleLocationDto, UpdateLocationDto } from './dto/admin-dashboard.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CreateMotorcycleDto } from '../motorcycles/dto/create-motorcycle.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ 
    summary: 'Dashboard de administrador', 
    description: 'Obtiene el resumen de ingresos y estado de la flotilla' 
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen del dashboard',
    type: DashboardSummaryDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getDashboard(@Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getDashboardSummary();
  }

  @Get('motorcycles/location')
  @ApiOperation({ 
    summary: 'Ubicación de todas las motos', 
    description: 'Obtiene la ubicación de todas las motos para mostrar en el mapa' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de motos con ubicación',
    type: [MotorcycleLocationDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getAllLocations(@Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getAllMotorcyclesWithLocation();
  }

  @Get('motorcycles/:id/location')
  @ApiOperation({ 
    summary: 'Ubicación de una moto específica', 
    description: 'Obtiene la ubicación de una moto por su ID' 
  })
  @ApiResponse({
    status: 200,
    description: 'Ubicación de la moto',
    type: MotorcycleLocationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getMotorcycleLocation(@Param('id') id: string, @Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getMotorcycleLocation(id);
  }

  @Put('motorcycles/:id/location')
  @ApiOperation({ 
    summary: 'Actualizar ubicación de una moto', 
    description: 'Actualiza la ubicación GPS de una moto (simulación)' 
  })
  @ApiResponse({
    status: 200,
    description: 'Ubicación actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async updateLocation(
    @Param('id') id: string,
    @Body() locationData: UpdateLocationDto,
    @Req() req,
  ) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.updateMotorcycleLocation(id, locationData);
  }

  @Post('motorcycles')
  @ApiOperation({ 
    summary: 'Registrar una nueva moto', 
    description: 'Crea una nueva moto en el sistema (solo administrador)' 
  })
  @ApiResponse({
    status: 201,
    description: 'Moto creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async createMotorcycle(@Body() createMotorcycleDto: CreateMotorcycleDto, @Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.createMotorcycle(createMotorcycleDto);
  }

  @Get('revenue/history')
  @ApiOperation({ 
    summary: 'Historial de ingresos', 
    description: 'Obtiene el historial de ingresos de los últimos días para gráficos' 
  })
  @ApiResponse({
    status: 200,
    description: 'Historial de ingresos',
    schema: {
      example: [
        { date: '2026-07-15', total: 1500 },
        { date: '2026-07-16', total: 2500 },
      ]
    }
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getRevenueHistory(@Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getRevenueHistory(30);
  }

  @Get('users')
  @ApiOperation({ 
    summary: 'Listar todos los usuarios', 
    description: 'Obtiene la lista de todos los usuarios registrados (solo administrador)' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: [UserResponseDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getUsers(@Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getAllUsers();
  }

  @Get('users/:id')
  @ApiOperation({ 
    summary: 'Obtener un usuario por ID', 
    description: 'Obtiene los detalles de un usuario específico (solo administrador)' 
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren permisos de administrador',
  })
  async getUserById(@Param('id') id: string, @Req() req) {
    await this.adminService.verifyAdmin(req.user.userId);
    return this.adminService.getUserById(id);
  }
}
