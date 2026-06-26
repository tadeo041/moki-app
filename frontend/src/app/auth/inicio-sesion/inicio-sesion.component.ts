import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-inicio-sesion',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class PagueInicioSesionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}