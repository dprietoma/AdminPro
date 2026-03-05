import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.models';


@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

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

  cargarHospitales() {
      const url = `${this.baseUrl}/hospitales`;
      return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales))
  }

  crearHospitales(nombre: string) {
      const url = `${this.baseUrl}/hospitales`;
      return this.http.post<{ ok: boolean, hospitales: Hospital[] }>(url, { nombre }, this.headers)
      .pipe(
        map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales))
  }

  actualizarHospitales(id: string, nombre: string) {
      const url = `${this.baseUrl}/hospitales/${id}`;
      return this.http.put<{ ok: boolean, hospitales: Hospital[] }>(url, { nombre }, this.headers);
  }

  eliminarHospitales(id: string) {
      const url = `${this.baseUrl}/hospitales/${id}`;
      return this.http.delete(url, this.headers);
  }


}
