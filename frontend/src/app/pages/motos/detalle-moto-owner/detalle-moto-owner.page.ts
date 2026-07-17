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
  cardOutline,
  checkmarkCircle,
  chevronForwardOutline
} from 'ionicons/icons';

import { RentalsService } from '../../../services/rentals.service';

@Component({
  selector: 'app-detalle-moto-owner',
  standalone: true,
  templateUrl: './detalle-moto-owner.page.html',
  styleUrls: ['./detalle-moto-owner.page.scss'],
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

  renta: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalsService: RentalsService,
    private alertCtrl: AlertController
  ) {

    addIcons({
      calendarOutline,
      cardOutline,
      checkmarkCircle,
      chevronForwardOutline
    });

  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/tabs/mis-rentas']);
      return;
    }

    this.rentalsService.getMyRentals().subscribe({

      next: (rentas: any[]) => {

        this.renta = rentas.find(r => r.id === id);

        if (!this.renta) {
          this.router.navigate(['/tabs/mis-rentas']);
        }

      },

      error: (err) => {
        console.error(err);
        this.router.navigate(['/tabs/mis-rentas']);
      }

    });

  }

  async cancelarRenta() {

    const alert = await this.alertCtrl.create({

      header: 'Cancelar renta',

      message: '¿Seguro que deseas cancelar esta renta?',

      buttons: [

        {
          text: 'No',
          role: 'cancel'
        },

        {
          text: 'Sí, cancelar',
          role: 'destructive',

          handler: () => {

            this.rentalsService.cancelRental(this.renta.id).subscribe({

              next: () => {


                this.router.navigate(['/tabs/mis-rentas']);

              },

              error: (err) => {
                console.error(err);
              }

            });

          }

        }

      ]

    });

    await alert.present();

  }

  getEstadoTexto(status: string): string {

  switch (status) {

    case 'ACTIVE':
      return 'En curso';

    case 'PENDING':
      return 'En camino';

    case 'COMPLETED':
      return 'Finalizada';

    case 'CANCELLED':
      return 'Cancelada';

    default:
      return status;

  }

}

getClaseEstado(status: string): string {

  switch (status) {

    case 'ACTIVE':
      return 'badge-encurso';

    case 'PENDING':
      return 'badge-camino';

    case 'COMPLETED':
      return 'badge-finalizada';

    case 'CANCELLED':
      return 'badge-cancelada';

    default:
      return 'badge-camino';

  }

}

}