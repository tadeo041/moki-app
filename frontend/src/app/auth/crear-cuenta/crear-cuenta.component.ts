import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [FormsModule, IonContent, IonButton, IonIcon],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent {
  nombre = ''; email = ''; password = '';
  showPassword = false; aceptaTerminos = false;

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, personOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  goBack() { this.router.navigate(['/opciones-sesion']); }
  crearCuenta() {
    if (!this.nombre || !this.email || !this.password || !this.aceptaTerminos) return;
    this.router.navigate(['/tabs/inicio']);
  }
}