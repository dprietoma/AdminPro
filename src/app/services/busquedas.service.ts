import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.models';

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  constructor() {}

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid,
        ),
    );
  }

  busqueda(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${this.baseUrl}/todos/coleccion/${tipo}/${termino}`;
    const headers = {
      'x-token': this.token,
    };

    return this.http.get<any[]>(url, { headers }).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);

          case 'medicos':
            // return this.transformarMedicos(resp.resultados);
            return []; // placeholder

          case 'hospitales':
            // return this.transformarHospitales(resp.resultados);
            return []; // placeholder

          default:
            return []; // por si acaso (aunque con el union type, nunca debería caer aquí)
        }
      }),
    );
  }
}
