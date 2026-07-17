import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonBackButton,
  IonCheckbox,
  IonBadge
} from '@ionic/angular/standalone';

import {
  MotorcyclesService,
  Motorcycle
} from '../../../services/motorcycles.service';

@Component({
  selector: 'app-proceso-renta',
  standalone: true,
  templateUrl: './proceso-renta.page.html',
  styleUrls: ['./proceso-renta.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonBackButton,
    IonCheckbox,
    IonBadge
  ]
})
export class ProcesoRentaPage implements OnInit {

  motoId = '';

  moto!: Motorcycle;

  fechaInicio = '';
  fechaFin = '';

  servicios = {
    kitSeguridad: false,
    seguroBasico: false,
    entregaDomicilio: false
  };

  nombreTarjeta = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/tabs/inicio']);
      return;
    }

    this.motoId = id;

    this.motorcyclesService.getById(id).subscribe({
      next: (moto) => {
        this.moto = moto;
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/tabs/inicio']);
      }
    });

    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      this.nombreTarjeta = JSON.parse(usuario).name;
    }

  }

  get diasRenta(): number {

    if (!this.fechaInicio || !this.fechaFin) {
      return 0;
    }

    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    const diff = Math.ceil(
      (fin.getTime() - inicio.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    return diff > 0 ? diff : 0;
  }

  continuar(): void {
  if (!this.moto) {
    return;
  }

  this.router.navigate(['/resumen-compra'], {
    state: {
      moto: this.moto,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      dias: this.diasRenta,
      servicios: this.servicios,
      nombreTarjeta: this.nombreTarjeta   
    }
  });
}

}