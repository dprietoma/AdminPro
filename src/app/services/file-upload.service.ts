import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('imagen', archivo);

      const url = `${base_url}/uploads/${tipo}/${id}`;
      const resp = fetch(url, { 
        method: 'PUT',
        headers: {
          'x-token': sessionStorage.getItem('token') || ''
        },
        body: formData
      })
      .then(async resp => {
        if (resp.ok) {
          const data = await resp.json();
          console.log(data);
          resolve(data.nombreArchivo);
        } else {
          reject('No se pudo subir la imagen');
        }
      })
      .catch(err => {
        reject('Error en la subida de la imagen');
      });
    });
  }   

}
