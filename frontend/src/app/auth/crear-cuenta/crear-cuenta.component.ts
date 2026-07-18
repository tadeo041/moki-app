import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule, CommonModule, IonContent, IonButton, IonIcon, IonSpinner],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {
  nombre = '';
  email = '';
  password = '';
  showPassword = false;
  aceptaTerminos = false;
  cargando = false;

  private toastController = inject(ToastController);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ arrowBackOutline, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  goBack() { this.router.navigate(['/opciones-sesion']); }

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

  async crearCuenta() {
    if (!this.nombre || !this.email || !this.password || !this.aceptaTerminos) {
      await this.mostrarToast('Completa todos los campos y acepta los términos.');
      return;
    }

    this.cargando = true;

    this.authService.register(this.nombre, this.email, this.password).subscribe({
      next: async (respuesta) => {
        this.cargando = false;
        this.authService.guardarToken(respuesta.token);
        this.authService.guardarUsuario(respuesta.user);
        await this.mostrarToast('Cuenta creada correctamente', 'success');

        if (respuesta.user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/tabs/inicio']);
        }
      },
      error: async (error) => {
        this.cargando = false;
        console.error(error);
        const mensaje = error.error?.message || 'Ocurrió un error al crear la cuenta, intenta de nuevo';
        await this.mostrarToast(mensaje);
      }
    });
  }
}