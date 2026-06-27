import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButton, IonButtons, IonBackButton, IonCheckbox, IonBadge
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-proceso-renta',
  templateUrl: './proceso-renta.page.html',
  styleUrls: ['./proceso-renta.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButton, IonButtons, IonBackButton, IonCheckbox, IonBadge
  ]
})
export class ProcesoRentaPage implements OnInit {
  motoId: string | null = null;

  moto = {
    nombre: 'Yamaha FZ25 2024',
    precio: '$150'
  };

  fechaInicio = '';
  fechaFin = '';

  servicios = {
    kitSeguridad: false,
    seguroBasico: false,
    entregaDomicilio: false
  };

  nombreTarjeta = 'ANGEL DÍAZ';

  get diasRenta(): number {
    if (!this.fechaInicio || !this.fechaFin) return 0;
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);
    const diff = Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.motoId = this.route.snapshot.paramMap.get('id');
  }

  continuar() {
    this.router.navigate(['/resumen-compra']);
  }
}