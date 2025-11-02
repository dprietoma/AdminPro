import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  private usuarios = inject(UsuariosService);

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Promesa resuelta');
      } else {
        reject('Promesa rechazada');
      }
    });

    promesa
      .then((message) => {
        console.log(message);
      })
      .catch((error) => {
        console.error(error);
      });



      console.log(' fin del ngOnInit:' );



    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });

  }


  getUsuarios() {
    return new Promise((resolve) => {
      this.usuarios.getUsuarios().subscribe((usuarios) => {
        resolve(usuarios);
      });
    });

  }


}
