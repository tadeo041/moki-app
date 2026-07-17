import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';

import { Motorcycle } from '../../../services/motorcycles.service';

interface EstadoExito {
  moto: Motorcycle;
  dias: number;
  total: number;
}

@Component({
  selector: 'app-exito-renta',
  standalone: true,
  templateUrl: './exito-renta.page.html',
  styleUrls: ['./exito-renta.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonIcon]
})
export class ExitoRentaPage implements OnInit {

  moto?: Motorcycle;
  dias = 0;
  total = 0;

  constructor(private router: Router) {
    addIcons({ checkmarkCircleOutline });
  }

  ngOnInit(): void {
    const state = history.state as Partial<EstadoExito>;
    this.moto = state?.moto;
    this.dias = state?.dias ?? 0;
    this.total = state?.total ?? 0;
  }

  irAMisRentas(): void {
    this.router.navigate(['/tabs/mis-rentas']);
  }

}