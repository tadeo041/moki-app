import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MotorcyclesService } from './motorcycles.service';
import { AuthGuard } from '@nestjs/passport';
import { MotorcycleListDto, MotorcycleDetailDto } from './dto/motorcycle.dto';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';

@ApiTags('Motorcycles')
@Controller('motorcycles')
export class MotorcyclesController {
  constructor(private motorcyclesService: MotorcyclesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Crear una moto', 
    description: 'Registra una nueva moto en el sistema' 
  })
  @ApiResponse({
    status: 201,
    description: 'Moto creada exitosamente',
    type: MotorcycleDetailDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async create(@Body() createMotorcycleDto: CreateMotorcycleDto) {
    return this.motorcyclesService.create(createMotorcycleDto);
  }

  @Get('available')
  @ApiOperation({ 
    summary: 'Obtener motos disponibles', 
    description: 'Retorna todas las motos con estado AVAILABLE' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de motos disponibles',
    type: [MotorcycleListDto],
  })
  async findAllAvailable() {
    return this.motorcyclesService.findAllAvailable();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Obtener todas las motos', 
    description: 'Retorna todas las motos con sus rentas' 
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las motos',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async findAll() {
    return this.motorcyclesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener detalles de una moto', 
    description: 'Retorna información detallada de una moto específica' 
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la moto',
    type: MotorcycleDetailDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async findOne(@Param('id') id: string) {
    return this.motorcyclesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Actualizar una moto', 
    description: 'Actualiza los datos de una moto' 
  })
  @ApiResponse({
    status: 200,
    description: 'Moto actualizada exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.motorcyclesService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Eliminar una moto', 
    description: 'Elimina una moto del sistema' 
  })
  @ApiResponse({
    status: 200,
    description: 'Moto eliminada exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async remove(@Param('id') id: string) {
    return this.motorcyclesService.remove(id);
  }

  @Get(':id/availability')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Verificar disponibilidad', 
    description: 'Verifica si una moto está disponible para rentar' 
  })
  @ApiResponse({
    status: 200,
    description: 'Disponibilidad de la moto',
    schema: {
      properties: {
        available: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Moto no encontrada',
  })
  async checkAvailability(@Param('id') id: string) {
    return this.motorcyclesService.checkAvailability(id);
  }
}