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
import { AuthService } from 'src/app/services/auth.service';
import { StatusTranslatePipe } from 'src/app/pipes/status-translate.pipe';

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
    IonButton,
    StatusTranslatePipe
  ],
  templateUrl: './detalle-sos.page.html',
  styleUrls: ['./detalle-sos.page.scss']
})
export class DetalleSosPage implements OnInit {

  alerta: SosAlert | null = null;
  cargando = true;
  esAdmin = false;

  private toastController = inject(ToastController);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sosService = inject(SosService);
  private authService = inject(AuthService);

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
    this.esAdmin = this.authService.esAdmin();
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

  resolverAlerta(): void {
    if (!this.alerta) return;

    this.cargando = true;

    this.sosService.resolveSos(this.alerta.id).subscribe({
      next: () => {
        this.cargando = false;
        this.mostrarToast('Alerta resuelta exitosamente', 'success');
        this.cargarAlerta(this.alerta!.id);
      },
      error: (error) => {
        this.cargando = false;
        console.error('Error al resolver alerta:', error);
        this.mostrarToast('Error al resolver la alerta');
      }
    });
  }
}