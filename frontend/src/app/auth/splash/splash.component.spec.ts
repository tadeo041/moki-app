import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IonContent],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/opciones-sesion']);
    }, 2000);
  }
}