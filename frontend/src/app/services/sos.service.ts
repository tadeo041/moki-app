import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateSosDto {
  motorcycleId: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

export interface SosAlert {
  id: string;
  userId: string;
  motorcycleId: string;
  motorcycleName?: string;
  userName?: string;
  userEmail?: string;
  latitude: number;
  longitude: number;
  message: string;
  status: 'PENDING' | 'RESOLVED' | 'CANCELLED';
  createdAt: string;
  resolvedAt: string | null;
  motorcycle?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SosSummary {
  total: number;
  pending: number;
  resolved: number;
  cancelled: number;
}

export interface SosHistory {
  total: number;
  pending: number;
  resolved: number;
  alerts: SosAlert[];
}

@Injectable({
  providedIn: 'root'
})
export class SosService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Usuario
  createSos(data: CreateSosDto): Observable<SosAlert> {
    return this.http.post<SosAlert>(`${this.api}/sos`, data, {
      headers: this.getHeaders()
    });
  }

  getMyAlerts(): Observable<SosAlert[]> {
    return this.http.get<SosAlert[]>(`${this.api}/sos/my-alerts`, {
      headers: this.getHeaders()
    });
  }

  cancelSos(id: string): Observable<any> {
    return this.http.post(
      `${this.api}/sos/${id}/cancel`,
      {},
      { headers: this.getHeaders() }
    );
  }

  getSosAlert(id: string): Observable<SosAlert> {
    return this.http.get<SosAlert>(`${this.api}/sos/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Admin
  getAllAlerts(): Observable<SosHistory> {
    return this.http.get<SosHistory>(`${this.api}/sos/all`, {
      headers: this.getHeaders()
    });
  }

  getSosSummary(): Observable<SosSummary> {
    return this.http.get<SosSummary>(`${this.api}/sos/summary`, {
      headers: this.getHeaders()
    });
  }

  // Admin
  resolveSos(id: string): Observable<SosAlert> {
    return this.http.put<SosAlert>(
      `${this.api}/sos/${id}/resolve`,
      {},
      { headers: this.getHeaders() }
    );
  }
}