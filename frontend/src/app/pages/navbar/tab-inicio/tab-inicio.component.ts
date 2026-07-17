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
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

import {
  MotorcyclesService,
  Motorcycle
} from '../../../services/motorcycles.service';

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
    IonBadge
  ],
  templateUrl: './tab-inicio.component.html',
  styleUrls: ['./tab-inicio.component.scss']
})
export class TabInicioComponent implements OnInit, ViewWillEnter {

  motos: Motorcycle[] = [];
  nombreUsuario = '';

  constructor(
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {
    addIcons({ searchOutline });
  }

  ngOnInit(): void {

    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      this.nombreUsuario = JSON.parse(usuario).name;
    }

    this.cargarMotosDisponibles();

  }

  ionViewWillEnter(): void {
    this.cargarMotosDisponibles();
  }

  cargarMotosDisponibles(): void {

    this.motorcyclesService.getAvailable().subscribe({
      next: (motos) => {
        console.log('Motos disponibles:', motos);
        this.motos = motos;
      },
      error: (error) => {
        console.error('Error al obtener motos', error);
      }
    });

  }

  verDetalle(id: string) {
    this.router.navigate(['/detalle-moto', id]);
  }

}