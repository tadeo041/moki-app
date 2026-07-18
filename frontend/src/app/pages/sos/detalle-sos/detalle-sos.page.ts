import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonIcon,
  IonButton,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircle,
  checkmarkCircle,
  bicycleOutline,
  personOutline,
  mailOutline,
  calendarOutline,
  checkmarkDoneOutline,
  locationOutline
} from 'ionicons/icons';

import { SosService, SosAlert } from 'src/app/services/sos.service';

@Component({
  selector: 'app-detalle-sos',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonIcon,
    IonButton
  ],
  templateUrl: './detalle-sos.page.html',
  styleUrls: ['./detalle-sos.page.scss']
})
export class DetalleSosPage implements OnInit {

  alerta: SosAlert | null = null;
  cargando = true;

  private toastController = inject(ToastController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sosService = inject(SosService);

  constructor() {
    addIcons({
      alertCircle,
      checkmarkCircle,
      bicycleOutline,
      personOutline,
      mailOutline,
      calendarOutline,
      checkmarkDoneOutline,
      locationOutline
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/sos/mis-alertas']);
      return;
    }

    this.cargarAlerta(id);
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

  cargarAlerta(id: string): void {
    this.cargando = true;

    this.sosService.getSosAlert(id).subscribe({
      next: (alerta) => {
        this.alerta = alerta;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar alerta:', error);
        this.cargando = false;
        this.router.navigate(['/sos/mis-alertas']);
      }
    });
  }

  cancelarAlerta(): void {
    if (!this.alerta) return;

    this.sosService.cancelSos(this.alerta.id).subscribe({
      next: () => {
        this.mostrarToast('Alerta cancelada', 'success');
        this.cargarAlerta(this.alerta!.id);
      },
      error: (error) => {
        console.error('Error al cancelar alerta:', error);
        this.mostrarToast('Error al cancelar la alerta');
      }
    });
  }
}