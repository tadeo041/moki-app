import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, arrowBackOutline } from 'ionicons/icons';

import {
  MotorcyclesService,
  Motorcycle
} from '../../../services/motorcycles.service';

@Component({
  selector: 'app-buscador-motos',
  templateUrl: './buscador-motos.page.html',
  styleUrls: ['./buscador-motos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton,
    IonSpinner
  ]
})
export class BuscadorMotosPage implements OnInit, ViewWillEnter {

  busqueda = '';
  motos: Motorcycle[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {
    addIcons({
      searchOutline,
      arrowBackOutline
    });
  }

  ngOnInit(): void {
    this.cargarMotos();
  }

  ionViewWillEnter(): void {
    this.cargarMotos();
  }

  cargarMotos(): void {
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

  get motosFiltradas(): Motorcycle[] {
    if (!this.busqueda.trim()) {
      return this.motos;
    }

    const q = this.busqueda.toLowerCase();

    return this.motos.filter(
      moto =>
        moto.name.toLowerCase().includes(q) ||
        moto.type.toLowerCase().includes(q) ||
        moto.description.toLowerCase().includes(q)
    );
  }

  verDetalle(id: string) {
    this.router.navigate(['/detalle-moto', id]);
  }

}