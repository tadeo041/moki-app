import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, IonContent, IonButton, IonIcon, IonSpinner],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {
  email = '';
  password = '';
  showPassword = false;
  cargando = false;

  private toastController = inject(ToastController);

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    addIcons({ arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
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

  login() {
    if (!this.email || !this.password) {
      this.mostrarToast('Completa todos los campos');
      return;
    }

    this.cargando = true;

    this.authService.login(this.email, this.password)
      .subscribe({
        next: (respuesta) => {
          this.cargando = false;
          this.authService.guardarToken(respuesta.token);
          this.authService.guardarUsuario(respuesta.user);

          if (respuesta.user.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/tabs/inicio']);
          }
        },
        error: (error) => {
          this.cargando = false;
          console.error(error);

          if (error.status === 0) {
            this.mostrarToast('El servidor está despertando, intenta de nuevo en unos segundos');
          } else if (error.status === 401) {
            this.mostrarToast('Correo o contraseña incorrectos');
          } else {
            const mensaje = error.error?.message || 'Ocurrió un error, intenta de nuevo';
            this.mostrarToast(mensaje);
          }
        }
      });
  }
}