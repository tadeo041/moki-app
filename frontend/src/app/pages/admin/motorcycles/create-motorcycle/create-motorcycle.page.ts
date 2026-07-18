import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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

import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-create-motorcycle',
  standalone: true,
  templateUrl: './create-motorcycle.page.html',
  styleUrls: ['./create-motorcycle.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
export class CreateMotorcyclePage {

  private adminService = inject(AdminService);
  private toastController = inject(ToastController);
  private router = inject(Router);

  form = {
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

  registrar(): void {
    if (!this.formularioValido) {
      this.mostrarToast('Completa todos los campos obligatorios');
      return;
    }

    this.cargando = true;

    this.adminService.createMotorcycle(this.form).subscribe({
      next: async () => {
        this.cargando = false;
        await this.mostrarToast('¡Moto registrada exitosamente!', 'success');
        this.router.navigate(['/admin/motorcycles']);
      },
      error: (error) => {
        this.cargando = false;
        console.error(error);
        const mensaje = error.error?.message || 'No se pudo registrar la moto, intenta de nuevo';
        this.mostrarToast(mensaje);
      }
    });
  }
}