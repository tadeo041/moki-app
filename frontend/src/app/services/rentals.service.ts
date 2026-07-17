import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreateRentalDto {
  motorcycleId: string;
  startDate: string;
  endDate: string;

  services: {
    insurance: boolean;
    helmetKit: boolean;
    delivery: boolean;
  };

  payment: {
    cardName: string;
    cardNumber: string;
    cardExpiry: string;
    cardCVV: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  private http = inject(HttpClient);

  private api = environment.apiUrl;

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  createRental(data: CreateRentalDto): Observable<any> {

    return this.http.post(
      `${this.api}/rentals`,
      data,
      {
        headers: this.getHeaders()
      }
    );

  }

  confirmPayment(
    rentalId: string,
    paymentIntentId: string
  ): Observable<any> {

    return this.http.post(
      `${this.api}/rentals/${rentalId}/confirm-payment`,
      {
        paymentIntentId
      },
      {
        headers: this.getHeaders()
      }
    );

  }

  getMyRentals(): Observable<any> {

    return this.http.get(
      `${this.api}/rentals/my-rentals`,
      {
        headers: this.getHeaders()
      }
    );

  }

  // NUEVO
  getRental(id: string): Observable<any> {

    return this.http.get(
      `${this.api}/rentals/${id}`,
      {
        headers: this.getHeaders()
      }
    );

  }

  cancelRental(id: string): Observable<any> {

    return this.http.post(
      `${this.api}/rentals/${id}/cancel`,
      {},
      {
        headers: this.getHeaders()
      }
    );

  }

}