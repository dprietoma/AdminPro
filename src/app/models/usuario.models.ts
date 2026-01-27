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
    const img = (this.img || '').trim();

    if (img.includes('https')) return img;

    if (img) return `${base_url}/uploads/usuarios/${img}`;

    return `${base_url}/uploads/usuarios/no-image`;
  }
}
