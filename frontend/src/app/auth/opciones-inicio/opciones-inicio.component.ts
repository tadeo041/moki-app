import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-opciones-inicio',
  standalone: true,
  imports: [RouterLink, IonContent, IonButton],
  templateUrl: './opciones-inicio.component.html',
  styleUrls: ['./opciones-inicio.component.scss']
})
export class OpcionesInicioComponent {}