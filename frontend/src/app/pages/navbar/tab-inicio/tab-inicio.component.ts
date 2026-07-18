import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonButton,
  IonBadge,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, alertCircleOutline } from 'ionicons/icons';

import {
  MotorcyclesService,
  Motorcycle
} from '../../../services/motorcycles.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tab-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    IonButton,
    IonBadge,
    IonSpinner
  ],
  templateUrl: './tab-inicio.component.html',
  styleUrls: ['./tab-inicio.component.scss']
})
export class TabInicioComponent implements OnInit, ViewWillEnter {

  motos: Motorcycle[] = [];
  nombreUsuario = '';
  iniciales = '';
  cargando = true;

  constructor(
    private router: Router,
    private motorcyclesService: MotorcyclesService,
    private authService: AuthService
  ) {
    addIcons({ searchOutline, alertCircleOutline });
  }

  ngOnInit(): void {
    this.nombreUsuario = this.authService.obtenerNombre();
    this.iniciales = this.authService.obtenerIniciales();
    this.cargarMotosDisponibles();
  }

  ionViewWillEnter(): void {
    this.cargarMotosDisponibles();
  }

  cargarMotosDisponibles(): void {
    this.cargando = true;

    this.motorcyclesService.getAvailable().subscribe({
      next: (motos) => {
        this.motos = motos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener motos', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/detalle-moto', id]);
  }
}