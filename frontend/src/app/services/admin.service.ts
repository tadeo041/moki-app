import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardSummary {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  availableMotorcycles: number;
  rentedMotorcycles: number;
  totalMotorcycles: number;
  activeRentals: number;
  pendingRentals: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface MotorcycleLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  lastLocationUpdate: string;
  renterName: string | null;
  renterEmail: string | null;
}

export interface RevenueHistory {
  date: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private api = environment.apiUrl;

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Dashboard
  getDashboard(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.api}/admin/dashboard`, {
      headers: this.getHeaders()
    });
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/admin/users`, {
      headers: this.getHeaders()
    });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.api}/admin/users/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Motorcycles Location
  getAllMotorcyclesLocation(): Observable<MotorcycleLocation[]> {
    return this.http.get<MotorcycleLocation[]>(`${this.api}/admin/motorcycles/location`, {
      headers: this.getHeaders()
    });
  }

  getMotorcycleLocation(id: string): Observable<MotorcycleLocation> {
    return this.http.get<MotorcycleLocation>(`${this.api}/admin/motorcycles/${id}/location`, {
      headers: this.getHeaders()
    });
  }

  updateMotorcycleLocation(id: string, latitude: number, longitude: number): Observable<any> {
    return this.http.put(
      `${this.api}/admin/motorcycles/${id}/location`,
      { latitude, longitude },
      { headers: this.getHeaders() }
    );
  }

  // Revenue
  getRevenueHistory(days?: number): Observable<RevenueHistory[]> {
    const url = days ? `${this.api}/admin/revenue/history?days=${days}` : `${this.api}/admin/revenue/history`;
    return this.http.get<RevenueHistory[]>(url, {
      headers: this.getHeaders()
    });
  }

  // Create Motorcycle (Admin only)
  createMotorcycle(data: any): Observable<any> {
    return this.http.post(`${this.api}/admin/motorcycles`, data, {
      headers: this.getHeaders()
    });
  }
}