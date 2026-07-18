import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSosDto } from './dto/create-sos.dto';

@Injectable()
export class SosService {
  constructor(private prisma: PrismaService) {}

  async createSos(userId: string, createSosDto: CreateSosDto) {
    const { motorcycleId, latitude, longitude, message } = createSosDto;

    // Verificar que la moto existe
    const motorcycle = await this.prisma.motorcycle.findUnique({
      where: { id: motorcycleId },
    });

    if (!motorcycle) {
      throw new NotFoundException('Moto no encontrada');
    }

    // Verificar que el usuario tiene una renta activa con esta moto
    const activeRental = await this.prisma.rental.findFirst({
      where: {
        userId,
        motorcycleId,
        status: 'ACTIVE',
      },
    });

    if (!activeRental) {
      throw new ForbiddenException('No tienes una renta activa con esta moto');
    }

    // Crear la alerta SOS
    const sosAlert = await this.prisma.sosAlert.create({
      data: {
        userId,
        motorcycleId,
        latitude: latitude || null,
        longitude: longitude || null,
        message: message || null,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        motorcycle: {
          select: {
            name: true,
          },
        },
      },
    });

    return sosAlert;
  }

  async getMySosAlerts(userId: string) {
    return this.prisma.sosAlert.findMany({
      where: { userId },
      include: {
        motorcycle: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllSosAlerts() {
    const alerts = await this.prisma.sosAlert.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        motorcycle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = alerts.length;
    const pending = alerts.filter(a => a.status === 'PENDING').length;
    const resolved = alerts.filter(a => a.status === 'RESOLVED').length;

    return {
      total,
      pending,
      resolved,
      alerts: alerts.map(alert => ({
        id: alert.id,
        userId: alert.userId,
        motorcycleId: alert.motorcycleId,
        motorcycleName: alert.motorcycle.name,
        userName: alert.user.name,
        userEmail: alert.user.email,
        latitude: alert.latitude || 0,
        longitude: alert.longitude || 0,
        message: alert.message || '',
        status: alert.status,
        createdAt: alert.createdAt,
        resolvedAt: alert.resolvedAt,
      })),
    };
  }

  async resolveSosAlert(alertId: string) {
    const alert = await this.prisma.sosAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alerta SOS no encontrada');
    }

    if (alert.status === 'RESOLVED') {
      throw new ForbiddenException('Esta alerta ya fue resuelta');
    }

    return this.prisma.sosAlert.update({
      where: { id: alertId },
      data: {
        status: 'RESOLVED',
        resolvedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        motorcycle: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async cancelSosAlert(alertId: string, userId: string) {
    const alert = await this.prisma.sosAlert.findUnique({
      where: { id: alertId },
    });

    if (!alert) {
      throw new NotFoundException('Alerta SOS no encontrada');
    }

    if (alert.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para cancelar esta alerta');
    }

    if (alert.status === 'RESOLVED') {
      throw new ForbiddenException('Esta alerta ya fue resuelta');
    }

    return this.prisma.sosAlert.update({
      where: { id: alertId },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async getSosAlertById(alertId: string) {
    const alert = await this.prisma.sosAlert.findUnique({
      where: { id: alertId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        motorcycle: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!alert) {
      throw new NotFoundException('Alerta SOS no encontrada');
    }

    // Transformar la respuesta para que tenga las propiedades planas
    return {
      id: alert.id,
      userId: alert.userId,
      motorcycleId: alert.motorcycleId,
      motorcycleName: alert.motorcycle.name,
      userName: alert.user.name,
      userEmail: alert.user.email,
      latitude: alert.latitude || 0,
      longitude: alert.longitude || 0,
      message: alert.message || '',
      status: alert.status,
      createdAt: alert.createdAt,
      resolvedAt: alert.resolvedAt,
    };
  }

  async getSosSummary() {
    const total = await this.prisma.sosAlert.count();
    const pending = await this.prisma.sosAlert.count({
      where: { status: 'PENDING' },
    });
    const resolved = await this.prisma.sosAlert.count({
      where: { status: 'RESOLVED' },
    });
    const cancelled = await this.prisma.sosAlert.count({
      where: { status: 'CANCELLED' },
    });

    return {
      total,
      pending,
      resolved,
      cancelled,
    };
  }
}