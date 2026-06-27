import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
import {
  speedometerOutline,
  mapOutline,
  flashOutline,
  bicycleOutline
} from 'ionicons/icons';

interface Moto {
  id: number;
  nombre: string;
  precio: string;
  descripcion: string;
  velocidad: string;
  kilometraje: string;
  consumo: string;
  tipo: string;
  imagen?: string;
}

@Component({
  selector: 'app-detalle-moto',
  templateUrl: './detalle-moto.page.html',
  styleUrls: ['./detalle-moto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
export class DetalleMotoPage implements OnInit {
  moto: Moto | null = null;

  private catalogo: Moto[] = [
    {
      id: 1,
      nombre: 'Yamaha FZ25 2024',
      precio: '$150',
      descripcion:
        'Una motocicleta diseñada para quienes buscan un equilibrio perfecto entre rendimiento deportivo y comodidad en la ciudad.',
      velocidad: '140 Km/h',
      kilometraje: '15,000 Km',
      consumo: '35 KM/L',
      tipo: 'Deportiva',
      imagen: 'assets/motos/yamaha-fz25.jpg'
    },
    {
      id: 2,
      nombre: 'Bajaj Rouser 125',
      precio: '$150',
      descripcion:
        'Motocicleta ligera y económica, perfecta para reparto y movilidad urbana.',
      velocidad: '110 Km/h',
      kilometraje: '20,000 Km',
      consumo: '42 KM/L',
      tipo: 'Urbana',
      imagen: 'assets/motos/bajaj-125.jpg'
    },
    {
      id: 3,
      nombre: 'Honda CB190R',
      precio: '$130',
      descripcion:
        'Equilibrio perfecto entre potencia y consumo con diseño moderno.',
      velocidad: '120 Km/h',
      kilometraje: '18,000 Km',
      consumo: '38 KM/L',
      tipo: 'Urbana',
      imagen: 'assets/motos/honda-cb190r.jpg'
    },
    {
      id: 4,
      nombre: 'Suzuki GS150',
      precio: '$120',
      descripcion:
        'Clásica y confiable. Ideal para quienes buscan comodidad y eficiencia.',
      velocidad: '105 Km/h',
      kilometraje: '22,000 Km',
      consumo: '45 KM/L',
      tipo: 'Clásica',
      imagen: 'assets/motos/suzuki-gs150.jpg'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({
      speedometerOutline,
      mapOutline,
      flashOutline,
      bicycleOutline
    });
  }

  ngOnInit() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.moto =
      this.catalogo.find(m => m.id === id) ||
      this.catalogo[0];
  }

  rentarAhora() {
    this.router.navigate([
      '/proceso-renta',
      this.moto?.id
    ]);
  }
}