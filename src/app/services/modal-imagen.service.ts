import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  private baseUrl = environment.baseUrl;
  public tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  public id: string = '';
  public img: string = 'no-image';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-image') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    // this.img = img;
    if (img.includes('http')) {
      this.img = img;
    } else {
      this.img = `${this.baseUrl}/uploads/${tipo}/${img}`;
    }
  }
  
  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
