import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonContent,
  IonIcon, IonButton, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonContent, IonIcon, IonButton, IonBadge],
  templateUrl: './tab-inicio.component.html',
  styleUrls: ['./tab-inicio.component.scss']
})
export class TabInicioComponent {
  motos = [
    { id: 1, nombre: 'Bajaj Rouser 125', precio: '$150', descripcion: 'Ideal para reparto - 150cc' },
    { id: 2, nombre: 'Yamaha FZ25 2024', precio: '$150', descripcion: 'Ideal para reparto - 250cc' },
  ];

  constructor(private router: Router) {
    addIcons({ searchOutline });
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-moto', id]);
  }
}