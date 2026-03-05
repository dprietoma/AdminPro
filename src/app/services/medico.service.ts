import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
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

  cargarMedicos() {
    const url = `${this.baseUrl}/medicos`;
    return this.http
      .get<{ ok: boolean; medicos: Medico[] }>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medicos: Medico[] }) => resp.medicos));
  }

  obtenerMedicoById(id: string) {
    const url = `${this.baseUrl}/medicos/${id}`;
    return this.http
      .get<{ ok: boolean; medico: Medico }>(url, this.headers)
      .pipe(map((resp: { ok: boolean; medico: Medico }) => resp.medico));
  }

  crearMedicos(medico: { nombre: string; hospital: string }) {
    const url = `${this.baseUrl}/medicos`;
    return this.http
      .post<{
        ok: boolean;
        medicos: Medico[];
      }>(url, medico , this.headers);
  }

  actualizarMedicos(medico:Medico) {
    const url = `${this.baseUrl}/medicos/${medico._id}`;
    return this.http.put<{ ok: boolean, medico: Medico }>(url, medico, this.headers);
  }

  eliminarMedicos(id: string) {
    const url = `${this.baseUrl}/medicos/${id}`;
    return this.http.delete(url, this.headers);
  }
}
