import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráficas', url: 'graphics1' },
        { titulo: 'Promesas', url: 'promises' },
        { titulo: 'RxJS', url: 'rxjs' },
      ],
    },
  ];
  constructor() { }
  
}
