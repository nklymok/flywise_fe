// my-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PassengerDto } from '../../shared/dto/passenger.dto';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiUrl = 'http://localhost:5081/api/passenger';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PassengerDto[]> {
    return this.http
      .get<PassengerDto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<PassengerDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<PassengerDto>(url).pipe(catchError(this.handleError));
  }

  create(passengerDto: Omit<PassengerDto, 'id'>): Observable<PassengerDto> {
    return this.http
      .post<PassengerDto>(this.apiUrl, passengerDto)
      .pipe(catchError(this.handleError));
  }

  update(id: number, passengerDto: PassengerDto): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<void>(url, passengerDto)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return throwError(() => error.message || error);
  }
}
