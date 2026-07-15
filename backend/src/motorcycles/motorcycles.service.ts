import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMotorcycleDto } from './dto/create-motorcycle.dto';

@Injectable()
export class MotorcyclesService {
  constructor(private prisma: PrismaService) {}

  async create(createMotorcycleDto: CreateMotorcycleDto) {
    return this.prisma.motorcycle.create({
      data: {
        name: createMotorcycleDto.name,
        pricePerHour: createMotorcycleDto.pricePerHour,
        cc: createMotorcycleDto.cc,
        year: createMotorcycleDto.year,
        imageUrl: createMotorcycleDto.imageUrl,
        maxSpeed: createMotorcycleDto.maxSpeed,
        mileage: createMotorcycleDto.mileage,
        consumption: createMotorcycleDto.consumption,
        type: createMotorcycleDto.type,
        cylinders: createMotorcycleDto.cylinders,
        brakes: createMotorcycleDto.brakes,
        description: createMotorcycleDto.description,
        status: 'AVAILABLE',
      },
    });
  }

  async findAllAvailable() {
    return this.prisma.motorcycle.findMany({
      where: { status: 'AVAILABLE' },
      select: {
        id: true,
        name: true,
        pricePerHour: true,
        cc: true,
        year: true,
        imageUrl: true,
      },
    });
  }

  async findAll() {
    return this.prisma.motorcycle.findMany({
      include: {
        rentals: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
        imageUrl: true,
        pricePerHour: true,
        maxSpeed: true,
        mileage: true,
        consumption: true,
        type: true,
        cylinders: true,
        brakes: true,
        description: true,
        cc: true,
        year: true,
      },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    return motorcycle;
  }

  async update(id: string, updateData: any) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    return this.prisma.motorcycle.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    // Verificar si tiene rentas activas
    const activeRentals = await this.prisma.rental.findFirst({
      where: {
        motorcycleId: id,
        status: { in: ['PENDING', 'ACTIVE'] },
      },
    });

    if (activeRentals) {
      throw new Error('No se puede eliminar una moto con rentas activas');
    }

    return this.prisma.motorcycle.delete({
      where: { id },
    });
  }

  async checkAvailability(id: string) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    return { available: motorcycle.status === 'AVAILABLE' };
  }
}