import { inject, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';

 
declare const google: any; 

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  private apiKey = 'reqres-free-v1';
  private router = inject(Router);
  private ngzone = inject(NgZone);


  validarToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token') || '';
    return this.http.get(`${this.baseUrl}/auth/renew`, {
      headers: {
        'x-api-key': this.apiKey,
        'x-token': token,
      },
    }).pipe(
      map((resp: any) => {
        sessionStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((err) => of(false))
    );      
      
  }

  getUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey, // 👈 nombre correcto del header
      Accept: 'application/json',
    });

    return this.http
      .get<{ data: any[] }>(`${this.baseUrl}/usuarios`, { headers })
      .pipe(
        map((res) => (Array.isArray(res?.data) ? res.data : [])),
        catchError((err) => {
          console.error('getUsuarios error:', err);
          return of([]); // evita que tu app se caiga
        })
      );
  }

  crearUsuario(usuario: RegisterForm) {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  LoginUsuario(formData: LoginForm) {
    return this.http.post(`${this.baseUrl}/auth/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http
      .post(`${this.baseUrl}/auth/google`, { token })
      .pipe(
        tap((resp: any) => {
          sessionStorage.setItem('token', resp.token);
          sessionStorage.setItem('googleEmail', resp.email);
        })
      );
  }

  logout() {
    const email = sessionStorage.getItem('googleEmail') || '';
    google.accounts.oauth2.revoke(email, () => {      
      this.ngzone.run(() => {
        this.router.navigateByUrl('/auth/login');
      })
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('googleEmail');
    })
  }
  
}



