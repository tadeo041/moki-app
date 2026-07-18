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
import { addCircleOutline, chevronForwardOutline, locationOutline } from 'ionicons/icons';

import { MotorcyclesService, Motorcycle } from '../../../services/motorcycles.service';

@Component({
  selector: 'app-admin-motorcycles',
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
  templateUrl: './motorcycles.page.html',
  styleUrls: ['./motorcycles.page.scss']
})
export class AdminMotorcyclesPage implements OnInit, ViewWillEnter {

  motos: Motorcycle[] = [];
  cargando = true;

  constructor(
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {
    addIcons({ addCircleOutline, chevronForwardOutline, locationOutline });
  }

  ngOnInit(): void {
    this.cargarMotos();
  }

  ionViewWillEnter(): void {
    this.cargarMotos();
  }

  cargarMotos(): void {
    this.cargando = true;

    this.motorcyclesService.getAll().subscribe({
      next: (motos) => {
        this.motos = motos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar motos', error);
        this.cargando = false;
      }
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/admin/motorcycles', id]);
  }
}