import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonIcon,
  IonButton,
  IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { refreshOutline, locationOutline, chevronForwardOutline } from 'ionicons/icons';

import { SosService, SosAlert, SosSummary } from '../../../services/sos.service';

@Component({
  selector: 'app-admin-sos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSpinner,
    IonIcon,
    IonButton,
    IonButtons
  ],
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss']
})
export class AdminSosPage implements OnInit, ViewWillEnter {

  alertas: SosAlert[] = [];
  summary: SosSummary | null = null;
  cargando = true;

  constructor(
    private router: Router,
    private sosService: SosService
  ) {
    addIcons({ refreshOutline, locationOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.cargarAlertas();
  }

  ionViewWillEnter(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    this.cargando = true;

    this.sosService.getAllAlerts().subscribe({
      next: (data) => {
        this.alertas = data.alerts;
        this.summary = {
          total: data.total,
          pending: data.pending,
          resolved: data.resolved,
          cancelled: 0
        };
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar alertas SOS', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/sos/detalle', id]);
  }
}