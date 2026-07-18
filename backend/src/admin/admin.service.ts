import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateLocationDto } from './dto/admin-dashboard.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async verifyAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('Acceso denegado. Se requieren permisos de administrador.');
    }

    return true;
  }

  async getDashboardSummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const todayRevenue = await this.prisma.rental.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    const weekRevenue = await this.prisma.rental.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: weekStart,
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    const monthRevenue = await this.prisma.rental.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: monthStart,
        },
      },
      _sum: {
        totalPrice: true,
      },
    });

    const totalMotorcycles = await this.prisma.motorcycle.count();
    const availableMotorcycles = await this.prisma.motorcycle.count({
      where: { status: 'AVAILABLE' },
    });
    const rentedMotorcycles = await this.prisma.motorcycle.count({
      where: { status: 'RENTED' },
    });

    const activeRentals = await this.prisma.rental.count({
      where: { status: 'ACTIVE' },
    });
    const pendingRentals = await this.prisma.rental.count({
      where: { status: 'PENDING' },
    });

    return {
      todayRevenue: todayRevenue._sum.totalPrice || 0,
      weekRevenue: weekRevenue._sum.totalPrice || 0,
      monthRevenue: monthRevenue._sum.totalPrice || 0,
      availableMotorcycles,
      rentedMotorcycles,
      totalMotorcycles,
      activeRentals,
      pendingRentals,
    };
  }

  async getAllMotorcyclesWithLocation() {
    const motorcycles = await this.prisma.motorcycle.findMany({
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        status: true,
        lastLocationUpdate: true,
        rentals: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return motorcycles.map((moto) => ({
      id: moto.id,
      name: moto.name,
      latitude: moto.latitude || 0,
      longitude: moto.longitude || 0,
      status: moto.status,
      lastLocationUpdate: moto.lastLocationUpdate,
      renterName: moto.rentals[0]?.user.name || null,
      renterEmail: moto.rentals[0]?.user.email || null,
    }));
  }

  async getMotorcycleLocation(motorcycleId: string) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id: motorcycleId },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        status: true,
        lastLocationUpdate: true,
        rentals: {
          where: {
            status: 'ACTIVE',
          },
          select: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    return {
      id: motorcycle.id,
      name: motorcycle.name,
      latitude: motorcycle.latitude || 0,
      longitude: motorcycle.longitude || 0,
      status: motorcycle.status,
      lastLocationUpdate: motorcycle.lastLocationUpdate,
      renterName: motorcycle.rentals[0]?.user.name || null,
      renterEmail: motorcycle.rentals[0]?.user.email || null,
    };
  }

  async updateMotorcycleLocation(motorcycleId: string, locationData: UpdateLocationDto) {
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id: motorcycleId },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    return this.prisma.motorcycle.update({
      where: { id: motorcycleId },
      data: {
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        lastLocationUpdate: new Date(),
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        status: true,
        lastLocationUpdate: true,
      },
    });
  }

  async createMotorcycle(data: any) {
    return this.prisma.motorcycle.create({
      data: {
        name: data.name,
        pricePerHour: data.pricePerHour,
        cc: data.cc,
        year: data.year,
        imageUrl: data.imageUrl,
        maxSpeed: data.maxSpeed,
        mileage: data.mileage,
        consumption: data.consumption,
        type: data.type,
        cylinders: data.cylinders,
        brakes: data.brakes,
        description: data.description,
        status: 'AVAILABLE',
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      },
    });
  }

  async getRevenueHistory(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const rentals = await this.prisma.rental.findMany({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        totalPrice: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const revenueByDay: { [key: string]: number } = {};
    rentals.forEach((rental) => {
      const date = rental.createdAt.toISOString().split('T')[0];
      revenueByDay[date] = (revenueByDay[date] || 0) + rental.totalPrice;
    });

    return Object.entries(revenueByDay).map(([date, total]) => ({
      date,
      total,
    }));
  }
}