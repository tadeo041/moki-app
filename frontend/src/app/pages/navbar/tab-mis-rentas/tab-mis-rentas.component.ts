import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';

import { RentalsService } from '../../../services/rentals.service';

@Component({
  selector: 'app-tab-mis-rentas',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonBadge
  ],
  templateUrl: './tab-mis-rentas.component.html',
  styleUrls: ['./tab-mis-rentas.component.scss']
})
export class TabMisRentasComponent implements OnInit, ViewWillEnter {

  rentas: any[] = [];

  constructor(
    private router: Router,
    private rentalsService: RentalsService
  ) {}

  ngOnInit(): void {
    this.cargarRentas();
  }

  ionViewWillEnter(): void {
    this.cargarRentas();
  }

  cargarRentas(): void {

    this.rentalsService.getMyRentals().subscribe({

      next: (response) => {

        console.log(response);

        this.rentas = response;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  verDetalle(id: string) {

    this.router.navigate(['/mis-rentas/detalle', id]);

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
      return 'badge-curso';

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