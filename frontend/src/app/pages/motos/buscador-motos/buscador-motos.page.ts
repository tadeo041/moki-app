import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline, arrowBackOutline } from 'ionicons/icons';

interface Moto {
  id: number;
  nombre: string;
  precio: string;
  descripcion: string;
  imagen?: string;
}

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
    IonBackButton
  ]
})
export class BuscadorMotosPage {
  busqueda = '';

  motos: Moto[] = [
    {
      id: 1,
      nombre: 'Yamaha FZ25 2024',
      precio: '$150',
      descripcion: 'Ideal para reparto · 250cc',
      imagen: 'assets/motos/yamaha-fz25.jpg'
    },
    {
      id: 2,
      nombre: 'Bajaj Rouser 125',
      precio: '$150',
      descripcion: 'Ideal para reparto · 150cc',
      imagen: 'assets/motos/bajaj-125.jpg'
    },
    {
      id: 3,
      nombre: 'Honda CB190R',
      precio: '$130',
      descripcion: 'Urbana y eficiente · 190cc',
      imagen: 'assets/motos/honda-cb190r.jpg'
    },
    {
      id: 4,
      nombre: 'Suzuki GS150',
      precio: '$120',
      descripcion: 'Económica y ligera · 150cc',
      imagen: 'assets/motos/suzuki-gs150.jpg'
    }
  ];

  get motosFiltradas() {
    if (!this.busqueda.trim()) {
      return this.motos;
    }

    const q = this.busqueda.toLowerCase();

    return this.motos.filter(
      moto =>
        moto.nombre.toLowerCase().includes(q) ||
        moto.descripcion.toLowerCase().includes(q)
    );
  }

  constructor(private router: Router) {
    addIcons({
      searchOutline,
      arrowBackOutline
    });
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-moto', id]);
  }
}