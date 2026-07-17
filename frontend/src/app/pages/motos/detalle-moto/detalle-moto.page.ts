import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  speedometerOutline,
  mapOutline,
  flashOutline,
  bicycleOutline
} from 'ionicons/icons';

import {
  MotorcyclesService,
  Motorcycle
} from '../../../services/motorcycles.service';

@Component({
  selector: 'app-detalle-moto',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton
  ],
  templateUrl: './detalle-moto.page.html',
  styleUrls: ['./detalle-moto.page.scss']
})
export class DetalleMotoPage implements OnInit {

  moto!: Motorcycle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {
    addIcons({
      speedometerOutline,
      mapOutline,
      flashOutline,
      bicycleOutline
    });
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.motorcyclesService.getById(id).subscribe({
      next: (moto) => {
        this.moto = moto;
      },
      error: (error) => {
        console.error('Error al obtener la moto', error);
      }
    });

  }

  rentarAhora() {
    this.router.navigate(['/proceso-renta', this.moto.id]);
  }

}