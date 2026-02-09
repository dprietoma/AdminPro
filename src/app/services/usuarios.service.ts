import { inject, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.models';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

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

  

  usuario!: Usuario;

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${this.baseUrl}/auth/renew`, {
        headers: {
          'x-api-key': this.apiKey,
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { nombre, email, img = '', google, role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          sessionStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((err) => of(false)),
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
        }),
      );
  }

  crearUsuario(usuario: RegisterForm) {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      }),
    );
  }

  actualizarUsuario(data: { nombre: string; email: string; role: string }) {
    return this.http.put(`${this.baseUrl}/usuarios/${this.usuario.uid}`, data, this.headers );
  }

  LoginUsuario(formData: LoginForm) {
    return this.http.post(`${this.baseUrl}/auth/login`, formData).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
      }),
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.baseUrl}/auth/google`, { token }).pipe(
      tap((resp: any) => {
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('googleEmail', resp.email);
      }),
    );
  }

  logout() {
    const email = sessionStorage.getItem('googleEmail') || '';
    google.accounts.oauth2.revoke(email, () => {
      this.ngzone.run(() => {
        this.router.navigateByUrl('/auth/login');
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('googleEmail');
    });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${this.baseUrl}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuarios>(url, this.headers)
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
          );
          return {
            total: resp.total,
            usuarios
          };
        })
      );  
  }

  eliminarUsuario(uid: string) {
    const url = `${this.baseUrl}/usuarios/${uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers );
  }
}
