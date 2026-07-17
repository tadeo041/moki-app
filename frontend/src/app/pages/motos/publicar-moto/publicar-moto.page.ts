import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonSpinner,
  ToastController
} from '@ionic/angular/standalone';

import {
  MotorcyclesService,
  CreateMotorcycleDto
} from '../../../services/motorcycles.service';

@Component({
  selector: 'app-publicar-moto',
  standalone: true,
  templateUrl: './publicar-moto.page.html',
  styleUrls: ['./publicar-moto.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonSpinner
  ]
})
export class PublicarMotoPage {

  private motorcyclesService = inject(MotorcyclesService);
  private toastController = inject(ToastController);
  private router = inject(Router);

  form: CreateMotorcycleDto = {
    name: '',
    pricePerHour: 0,
    cc: 0,
    year: new Date().getFullYear(),
    imageUrl: '',
    maxSpeed: '',
    mileage: '',
    consumption: '',
    type: '',
    cylinders: '',
    brakes: '',
    description: ''
  };

  cargando = false;

  get formularioValido(): boolean {
    return !!(
      this.form.name.trim() &&
      this.form.pricePerHour > 0 &&
      this.form.cc > 0 &&
      this.form.year &&
      this.form.imageUrl.trim() &&
      this.form.maxSpeed.trim() &&
      this.form.mileage.trim() &&
      this.form.consumption.trim() &&
      this.form.type.trim() &&
      this.form.cylinders.trim() &&
      this.form.brakes.trim()
    );
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'toast-moki'
    });
    await toast.present();
  }

  publicar(): void {

    if (!this.formularioValido) {
      this.mostrarToast('Completa todos los campos');
      return;
    }

    this.cargando = true;

    this.motorcyclesService.crear(this.form).subscribe({
      next: async () => {
        this.cargando = false;
        await this.mostrarToast('¡Tu moto fue publicada!', 'success');
        this.router.navigate(['/tabs/inicio']);
      },
      error: (error) => {
        this.cargando = false;
        console.error(error);
        const mensaje = error.error?.message || 'No se pudo publicar la moto, intenta de nuevo';
        this.mostrarToast(mensaje);
      }
    });

  }

}