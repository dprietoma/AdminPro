import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private usuariosService = inject(UsuariosService);
  private router = inject(Router);

  public usuario = this.usuariosService.usuario;

  logout() {
    this.usuariosService.logout();
  }

  buscar(termino: string) {
    if (termino.length === 0) return;
    this.router.navigateByUrl(`dashboard/busqueda/${termino}`);
  }

}
