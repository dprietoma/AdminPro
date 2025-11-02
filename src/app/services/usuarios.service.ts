import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    private http = inject(HttpClient);
  private url = 'https://reqres.in/api/users?page=2';
  private apiKey = 'reqres-free-v1';

  getUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,           // 👈 nombre correcto del header
      'Accept': 'application/json'
    });

    return this.http
      .get<{ data: any[] }>(this.url, { headers })
      .pipe(
        map(res => Array.isArray(res?.data) ? res.data : []),
        catchError(err => {
          console.error('getUsuarios error:', err);
          return of([]); // evita que tu app se caiga
        })
      );
  }
}
