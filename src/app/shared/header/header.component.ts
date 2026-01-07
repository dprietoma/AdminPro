import { Component, inject } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private usuariosService = inject(UsuariosService);

  logout() {
    this.usuariosService.logout();
  }

}
