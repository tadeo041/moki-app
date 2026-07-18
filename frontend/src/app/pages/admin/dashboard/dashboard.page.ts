import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSpinner,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trendingUpOutline,
  calendarOutline,
  calendarNumberOutline,
  bicycleOutline,
  receiptOutline,
  timeOutline,
  addCircleOutline,
  alertCircleOutline
} from 'ionicons/icons';

import { AdminService, DashboardSummary } from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSpinner,
    IonIcon,
    IonButton
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, ViewWillEnter {

  dashboard: DashboardSummary | null = null;
  cargando = true;

  constructor(private adminService: AdminService) {
    addIcons({
      trendingUpOutline,
      calendarOutline,
      calendarNumberOutline,
      bicycleOutline,
      receiptOutline,
      timeOutline,
      addCircleOutline,
      alertCircleOutline
    });
  }

  ngOnInit(): void {
    this.cargarDashboard();
  }

  ionViewWillEnter(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.cargando = true;

    this.adminService.getDashboard().subscribe({
      next: (data) => {
        this.dashboard = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar dashboard', error);
        this.cargando = false;
      }
    });
  }
}