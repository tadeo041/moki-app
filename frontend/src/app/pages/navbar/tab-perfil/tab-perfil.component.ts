import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tab-perfil',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './tab-perfil.component.html',
  styleUrls: ['./tab-perfil.component.scss']
})
export class TabPerfilComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  nombreUsuario = '';
  emailUsuario = '';
  iniciales = '';

  constructor() {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');

    if (usuario) {
      const datos = JSON.parse(usuario);
      this.nombreUsuario = datos.name;
      this.emailUsuario = datos.email;
      this.iniciales = this.calcularIniciales(datos.name);
    }
  }

  private calcularIniciales(nombre: string): string {
    if (!nombre) return '';

    const partes = nombre.trim().split(' ');

    if (partes.length === 1) {
      return partes[0].substring(0, 2).toUpperCase();
    }

    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/opciones-sesion']);
  }
}