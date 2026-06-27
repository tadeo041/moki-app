import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  AlertController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  calendarOutline,
  locationOutline,
  cardOutline,
  checkmarkCircle,
  chevronForwardOutline
} from 'ionicons/icons';

interface RentaActiva {
  id: number;
  moto: {
    nombre: string;
    precio: string;
    imagen?: string;
  };
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  ubicacion: string;
  pago: {
    numero: string;
    titular: string;
  };
  resumen: {
    renta: number;
    seguro: number;
    total: number;
  };
}

@Component({
  selector: 'app-detalle-moto-owner',
  templateUrl: './detalle-moto-owner.page.html',
  styleUrls: ['./detalle-moto-owner.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton
  ]
})
export class DetalleMotoOwnerPage implements OnInit {
  renta: RentaActiva | null = null;

  
  private rentas: RentaActiva[] = [
    {
      id: 1,
      moto: {
        nombre: 'Bajaj Rouser 125',
        precio: '$150',
        imagen: 'assets/motos/bajaj-125.jpg'
      },
      fechaInicio: '19 Octubre',
      fechaFin: '21 Octubre',
      dias: 2,
      ubicacion: 'Victoria Durango, Plaza de armas',
      pago: {
        numero: 'Visa **** **** **** 4242',
        titular: 'Angel Díaz'
      },
      resumen: {
        renta: 24963.21,
        seguro: 250,
        total: 26963.21
      }
    },
    {
      id: 2,
      moto: {
        nombre: 'Yamaha FZ25 2024',
        precio: '$150',
        imagen: 'assets/motos/yamaha-fz25.jpg'
      },
      fechaInicio: '18 Octubre',
      fechaFin: '20 Octubre',
      dias: 2,
      ubicacion: 'Victoria Durango, Centro',
      pago: {
        numero: 'Visa **** **** **** 4242',
        titular: 'Angel Díaz'
      },
      resumen: {
        renta: 24963.21,
        seguro: 250,
        total: 26963.21
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    addIcons({
      calendarOutline,
      locationOutline,
      cardOutline,
      checkmarkCircle,
      chevronForwardOutline
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.renta = this.rentas.find(r => r.id === id) || this.rentas[0];
  }

  async cancelarRenta() {
    const alert = await this.alertCtrl.create({
      header: '¿Cancelar renta?',
      message: 'Esta acción no se puede deshacer. Se notificará al rentador.',
      buttons: [
        {
          text: 'No, volver',
          role: 'cancel'
        },
        {
          text: 'Sí, cancelar',
          role: 'destructive',
          handler: () => {
            // Aquí va tu lógica de cancelación
            this.router.navigate(['/mis-rentas']);
          }
        }
      ]
    });
    await alert.present();
  }
}