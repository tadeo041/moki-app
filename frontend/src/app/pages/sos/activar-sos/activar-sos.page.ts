import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonIcon,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircle,
  bicycleOutline,
  locationOutline,
  warningOutline
} from 'ionicons/icons';

import { SosService } from 'src/app/services/sos.service'; 
import { RentalsService } from 'src/app/services/rentals.service'; 

@Component({
  selector: 'app-activar-sos',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonSpinner,
    IonIcon
  ],
  templateUrl: './activar-sos.page.html',
  styleUrls: ['./activar-sos.page.scss']
})
export class ActivarSosPage {
  cargando = false;
  rentaActiva: any = null;
  ubicacion: { lat: number; lng: number } | null = null;

  private toastController = inject(ToastController);
  private router = inject(Router);
  private sosService = inject(SosService);
  private rentalsService = inject(RentalsService);

  constructor() {
    addIcons({ alertCircle, bicycleOutline, locationOutline, warningOutline });
    this.obtenerUbicacion();
    this.obtenerRentaActiva();
  }

  private async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
      position: 'top',
      color,
      cssClass: 'toast-moki'
    });
    await toast.present();
  }

  obtenerUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.ubicacion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        (error) => {
          console.error('Error al obtener ubicación:', error);
        }
      );
    }
  }

  obtenerRentaActiva(): void {
    this.rentalsService.getMyRentals().subscribe({
      next: (rentas) => {
        this.rentaActiva = rentas.find((r: any) => r.status === 'ACTIVE');
      },
      error: (error) => {
        console.error('Error al obtener rentas:', error);
      }
    });
  }

  activarSos(): void {
    if (!this.rentaActiva) {
      this.mostrarToast('No tienes una renta activa. No puedes activar SOS.');
      return;
    }

    this.cargando = true;

    this.sosService.createSos({
      motorcycleId: this.rentaActiva.motorcycleId,
      latitude: this.ubicacion?.lat,
      longitude: this.ubicacion?.lng,
      message: '¡SOS! Necesito ayuda urgente.'
    }).subscribe({
      next: () => {
        this.cargando = false;
        this.mostrarToast('¡Alerta SOS enviada! Un administrador recibirá tu ubicación.', 'success');
        this.router.navigate(['/sos/mis-alertas']);
      },
      error: (error) => {
        this.cargando = false;
        console.error(error);
        this.mostrarToast('Error al enviar alerta SOS. Intenta de nuevo.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tabs/inicio']);
  }
}