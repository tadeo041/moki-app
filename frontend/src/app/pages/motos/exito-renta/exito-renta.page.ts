import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar,
  IonIcon, IonButton, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

@Component({
  selector: 'app-exito-renta',
  templateUrl: './exito-renta.page.html',
  styleUrls: ['./exito-renta.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar,
    IonIcon, IonButton, IonButtons, IonBackButton
  ]
})
export class ExitoRentaPage {
  constructor(private router: Router) {
    addIcons({ checkmarkCircle });
  }

  irAlInicio() {
    this.router.navigate(['/tabs/inicio']);
  }
}