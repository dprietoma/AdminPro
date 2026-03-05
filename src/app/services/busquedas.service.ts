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
 
  private transformarHospitales(resultados: any[]): any[] {
    return resultados.map(
      (hospital) => ({
        nombre: hospital.nombre,
        img: hospital.img,
        _id: hospital._id,
      }),
    );
  }

  private transformarMedicos(resultados: any[]): any[] {
    return resultados.map(
      (medico) => ({
        nombre: medico.nombre,
        img: medico.img,  
        _id: medico._id
      }),
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
            return this.transformarMedicos(resp.resultados);

          case 'hospitales':
            // return this.transformarHospitales(resp.resultados);
            return this.transformarHospitales(resp.resultados);

          default:
            return []; // por si acaso (aunque con el union type, nunca debería caer aquí)
        }
      }),
    );
  }
}
