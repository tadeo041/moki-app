import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, chevronForwardOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab-perfil',
  standalone: true,
  imports: [RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
  templateUrl: './tab-perfil.component.html',
  styleUrls: ['./tab-perfil.component.scss']
})
export class TabPerfilComponent {
  constructor(private router: Router) {
    addIcons({ cardOutline, chevronForwardOutline });
  }
  cerrarSesion() { this.router.navigate(['/opciones-sesion']); }
}