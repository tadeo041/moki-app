import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonIcon, IonButton, IonButtons, IonBackButton, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, locationOutline, cardOutline, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-resumen-compra',
  templateUrl: './resumen-compra.page.html',
  styleUrls: ['./resumen-compra.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonIcon, IonButton, IonButtons, IonBackButton, IonBadge
  ]
})
export class ResumenCompraPage {
  moto = {
    nombre: 'Yamaha FZ25 2024',
    precio: '$150/hora',
    imagen: 'assets/motos/yamaha-fz25.jpg'
  };

  fechas = '19 Octubre - 21 Octubre (2 días)';
  lugar = 'Victoria Durango, Plaza de armas';
  tarjeta = 'Visa **** **** **** 4242';
  titular = 'Ángel Díaz';

  resumen = {
    renta: '$24,963.21',
    seguro: '$250',
    total: '$26,963.21'
  };

  constructor(private router: Router) {
    addIcons({ calendarOutline, locationOutline, cardOutline, informationCircleOutline });
  }

  confirmarPago() {
    this.router.navigate(['/exito-renta']);
  }
}