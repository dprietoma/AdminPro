import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string,
  ) {}

  get imagenUrl() {
    const img = String(this.img ?? '').trim();

    if (!img) {
      return `${base_url}/uploads/usuarios/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${base_url}/uploads/usuarios/${img}`;
    } else {
      return `${base_url}/uploads/usuarios/no-image`;
    }

  }
}
