import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTranslate',
  standalone: true
})
export class StatusTranslatePipe implements PipeTransform {

  private statusMap: { [key: string]: string } = {
    // Estados de motos
    'AVAILABLE': 'Disponible',
    'RENTED': 'Rentada',
    'MAINTENANCE': 'Mantenimiento',
    // Estados de rentas
    'PENDING': 'Pendiente',
    'ACTIVE': 'Activa',
    'COMPLETED': 'Completada',
    'CANCELLED': 'Cancelada',
    // Estados de SOS
    'RESOLVED': 'Resuelta'
  };

  transform(value: string): string {
    return this.statusMap[value] || value;
  }
}