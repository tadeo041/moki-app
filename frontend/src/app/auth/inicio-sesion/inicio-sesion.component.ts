import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule, IonContent, IonButton, IonIcon],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent {
  email = ''; password = ''; showPassword = false;

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  goBack() { this.router.navigate(['/opciones-sesion']); }
  login() {
    if (!this.email || !this.password) return;
    this.router.navigate(['/tabs/inicio']);
  }
}