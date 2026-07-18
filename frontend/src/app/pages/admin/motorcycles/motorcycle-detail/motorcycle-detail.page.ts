import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner
} from '@ionic/angular/standalone';

import { MotorcyclesService,Motorcycle } from 'src/app/services/motorcycles.service';

@Component({
  selector: 'app-motorcycle-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonSpinner
  ],
  templateUrl: './motorcycle-detail.page.html',
  styleUrls: ['./motorcycle-detail.page.scss']
})
export class MotorcycleDetailPage implements OnInit {

  moto: Motorcycle | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private motorcyclesService: MotorcyclesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/admin/motorcycles']);
      return;
    }

    this.motorcyclesService.getById(id).subscribe({
      next: (moto) => {
        this.moto = moto;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar la moto', error);
        this.cargando = false;
        this.router.navigate(['/admin/motorcycles']);
      }
    });
  }
}