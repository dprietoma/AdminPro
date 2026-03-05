import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  private base_url = environment.baseUrl;

  transform(img: string, tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if (!img) {
      return `${this.base_url}/uploads/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${this.base_url}/uploads/${tipo}/${img}`;
    } else {
      return `${this.base_url}/uploads/${tipo}/no-image`;
    }
  }
}
