import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, checkmarkCircleOutline } from 'ionicons/icons';

import { SosService, SosAlert } from 'src/app/services/sos.service'; 

@Component({
  selector: 'app-mis-alertas',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonIcon
  ],
  templateUrl: './mis-alertas.page.html',
  styleUrls: ['./mis-alertas.page.scss']
})
export class MisAlertasPage implements OnInit, ViewWillEnter {

  alertas: SosAlert[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private sosService: SosService
  ) {
    addIcons({ chevronForwardOutline, checkmarkCircleOutline });
  }

  ngOnInit(): void {
    this.cargarAlertas();
  }

  ionViewWillEnter(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    this.cargando = true;

    this.sosService.getMyAlerts().subscribe({
      next: (alertas) => {
        this.alertas = alertas;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar alertas:', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: string): void {
    this.router.navigate(['/sos/detalle', id]);
  }
}