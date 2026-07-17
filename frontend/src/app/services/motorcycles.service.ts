import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Motorcycle {
  id: string;
  name: string;
  pricePerHour: number;
  cc: number;
  year: number;
  imageUrl: string;
  status: string;
  maxSpeed: string;
  mileage: string;
  consumption: string;
  type: string;
  cylinders: string;
  brakes: string;
  description: string;
}

export interface CreateMotorcycleDto {
  name: string;
  pricePerHour: number;
  cc: number;
  year: number;
  imageUrl: string;
  maxSpeed: string;
  mileage: string;
  consumption: string;
  type: string;
  cylinders: string;
  brakes: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotorcyclesService {

  private http = inject(HttpClient);
  private api = environment.apiUrl;

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  getAvailable(): Observable<Motorcycle[]> {
    return this.http.get<Motorcycle[]>(
      `${this.api}/motorcycles/available`
    );
  }

  getById(id: string): Observable<Motorcycle> {
    return this.http.get<Motorcycle>(
      `${this.api}/motorcycles/${id}`
    );
  }

  crear(data: CreateMotorcycleDto): Observable<Motorcycle> {
    return this.http.post<Motorcycle>(
      `${this.api}/motorcycles`,
      data,
      {
        headers: this.getHeaders()
      }
    );
  }

}