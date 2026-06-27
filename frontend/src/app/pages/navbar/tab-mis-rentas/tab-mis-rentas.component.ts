import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab-mis-rentas',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBadge],
  templateUrl: './tab-mis-rentas.component.html',
  styleUrls: ['./tab-mis-rentas.component.scss']
})
export class TabMisRentasComponent {
  rentas = [
    { id: 1, nombre: 'Bajaj Rouser 125', precio: '$150', dias: 2, entrega: '19 Oct.', estado: 'En curso', imagen: 'assets/motos/moto1.jpg' },
    { id: 2, nombre: 'Bajaj Rouser 125', precio: '$150', dias: 2, entrega: '19 Oct.', estado: 'En camino', imagen: 'assets/motos/moto2.jpg' },
  ];

  constructor(private router: Router) {}

  verDetalle(id: number) { this.router.navigate(['/mis-rentas/detalle', id]); }
}