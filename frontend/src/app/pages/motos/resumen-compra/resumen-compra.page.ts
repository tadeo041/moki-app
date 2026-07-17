import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonBadge
} from '@ionic/angular/standalone';

import { Motorcycle } from '../../../services/motorcycles.service';
import { RentalsService, CreateRentalDto } from '../../../services/rentals.service';

// Precios de ejemplo para los servicios adicionales.
// Ajusta estos valores a lo que realmente cobre tu negocio.
const PRECIO_KIT_SEGURIDAD = 100;
const PRECIO_SEGURO_BASICO = 150;
const PRECIO_ENTREGA_DOMICILIO = 80;

interface EstadoResumen {
  moto: Motorcycle;
  fechaInicio: string;
  fechaFin: string;
  dias: number;
  servicios: {
    kitSeguridad: boolean;
    seguroBasico: boolean;
    entregaDomicilio: boolean;
  };
  nombreTarjeta: string;
}

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  templateUrl: './resumen-compra.page.html',
  styleUrls: ['./resumen-compra.page.scss'],
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
    IonSpinner,
    IonBadge
  ]
})
export class ResumenCompraPage implements OnInit {

  moto?: Motorcycle;
  fechaInicio = '';
  fechaFin = '';
  dias = 0;

  servicios = {
    kitSeguridad: false,
    seguroBasico: false,
    entregaDomicilio: false
  };

  // Datos de pago
  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCVV = '';

  cargando = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private rentalsService: RentalsService
  ) {}

  ngOnInit(): void {
    const state = history.state as Partial<EstadoResumen>;

    if (!state || !state.moto) {
      // Si entran directo a esta URL sin pasar por proceso-renta, no hay datos
      this.router.navigate(['/tabs/inicio']);
      return;
    }

    this.moto = state.moto;
    this.fechaInicio = state.fechaInicio ?? '';
    this.fechaFin = state.fechaFin ?? '';
    this.dias = state.dias ?? 0;
    this.servicios = state.servicios ?? {
      kitSeguridad: false,
      seguroBasico: false,
      entregaDomicilio: false
    };
    this.cardName = state.nombreTarjeta ?? '';
  }

  get subtotalRenta(): number {
    if (!this.moto) return 0;
    return this.moto.pricePerHour * this.dias;
  }

  get costoServicios(): number {
    let costo = 0;
    if (this.servicios.kitSeguridad) costo += PRECIO_KIT_SEGURIDAD;
    if (this.servicios.seguroBasico) costo += PRECIO_SEGURO_BASICO;
    if (this.servicios.entregaDomicilio) costo += PRECIO_ENTREGA_DOMICILIO;
    return costo;
  }

  get total(): number {
    return this.subtotalRenta + this.costoServicios;
  }

  get formularioValido(): boolean {
    return !!(
      this.cardName.trim() &&
      this.cardNumber.trim() &&
      this.cardExpiry.trim() &&
      this.cardCVV.trim()
    );
  }

  confirmarRenta(): void {
    if (!this.moto || !this.formularioValido) {
      this.errorMsg = 'Completa todos los datos de pago';
      return;
    }

    this.cargando = true;
    this.errorMsg = '';

    const dto: CreateRentalDto = {
      motorcycleId: this.moto.id,
      startDate: new Date(this.fechaInicio).toISOString(),
      endDate: new Date(this.fechaFin).toISOString(),
      services: {
        helmetKit: this.servicios.kitSeguridad,
        insurance: this.servicios.seguroBasico,
        delivery: this.servicios.entregaDomicilio
      },
      payment: {
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        cardExpiry: this.cardExpiry,
        cardCVV: this.cardCVV
      }
    };

    this.rentalsService.createRental(dto).subscribe({
      next: (renta) => {
        this.cargando = false;
        this.router.navigate(['/exito-renta'], {
          state: {
            moto: this.moto,
            dias: this.dias,
            total: this.total,
            renta
          }
        });
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = err.error?.message || 'No se pudo procesar la renta, intenta de nuevo';
      }
    });
  }

}