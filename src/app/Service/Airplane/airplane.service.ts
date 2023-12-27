// my-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AirplaneDto } from '../../shared/dto/airplane.dto';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  private apiUrl = 'http://localhost:5081/api/airplane';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AirplaneDto[]> {
    return this.http
      .get<AirplaneDto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<AirplaneDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<AirplaneDto>(url).pipe(catchError(this.handleError));
  }

  create(airplaneDto: Omit<AirplaneDto, 'id'>): Observable<AirplaneDto> {
    return this.http
      .post<AirplaneDto>(this.apiUrl, airplaneDto)
      .pipe(catchError(this.handleError));
  }

  update(id: number, airplaneDto: AirplaneDto): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<void>(url, airplaneDto)
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
