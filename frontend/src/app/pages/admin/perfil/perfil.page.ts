import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logOutOutline,
  calendarOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-perfil',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon
  ],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class AdminPerfilPage implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  nombreUsuario = '';
  emailUsuario = '';
  iniciales = '';
  fechaRegistro = '';

  constructor() {
    addIcons({ logOutOutline, calendarOutline, shieldCheckmarkOutline });
  }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      const datos = JSON.parse(usuario);
      this.nombreUsuario = datos.name || 'Administrador';
      this.emailUsuario = datos.email || '';
      this.fechaRegistro = datos.createdAt || new Date().toISOString();
      this.iniciales = this.calcularIniciales(datos.name);
    }
  }

  private calcularIniciales(nombre: string): string {
    if (!nombre) return 'AD';
    const partes = nombre.trim().split(' ');
    if (partes.length === 1) {
      return partes[0].substring(0, 2).toUpperCase();
    }
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/opciones-sesion']);
  }
}
