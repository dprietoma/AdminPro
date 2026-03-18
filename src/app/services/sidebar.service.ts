import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  public menu: any[] = [];

   constructor() {
    this.cargarMenu();
  }

  cargarMenu(){
    this.menu = JSON.parse(sessionStorage.getItem('menu')|| '[]');
  }
  

  
}



// menu: any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráficas', url: 'graphics1' },
  //       { titulo: 'Promesas', url: 'promises' },
  //       { titulo: 'RxJS', url: 'rxjs' },
  //     ],
  //   },

  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ],
  //   },
  // ];
