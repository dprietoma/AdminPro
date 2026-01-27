import { Component, inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  private usuariosService = inject(UsuariosService);

  public usuario = this.usuariosService.usuario;
  public menuItems: any[] = [];

  constructor(private sidebarService: SidebarService) {
    this.menuItems = this.sidebarService.menu;
  }


  logout() {
    this.usuariosService.logout();
  }
}
