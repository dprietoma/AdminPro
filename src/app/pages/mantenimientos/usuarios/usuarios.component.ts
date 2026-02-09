import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { delay, pipe, Subscribable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  private usuariosService = inject(UsuariosService);
  private busquedasService = inject(BusquedasService);
  public modalImagenService = inject(ModalImagenService);

  public usuarios: Usuario[] = [];
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public paginaActual: number = 1;
  public cargando: boolean = true;
  public imgSubs!: Subscription;
  

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.consularUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( img => 
      {
        this.consularUsuarios()
      });
  }

  consularUsuarios() {
    this.cargando = true;
    this.usuariosService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    this.paginaActual += valor / 5;

    if (this.desde < 0) {
      this.desde = 0;
      this.paginaActual = 1;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
      this.paginaActual = Math.ceil(this.totalUsuarios / 5);
    }

    this.consularUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.consularUsuarios();
      return;
    }

    this.busquedasService
      .busqueda('usuarios', termino)
      .subscribe((resultados: any) => {
        this.usuarios = resultados;

        console.log('this.usuarios :', this.usuarios);
      });
  }

  eliminarUsuario(usuario: Usuario) {

    if(usuario.uid === this.usuariosService.usuario.uid){
       Swal.fire('Error', 'No puedes eliminarte a ti mismo', 'error');
       return;
    }

    Swal.fire({
      title: 'Esta seguro de elimar?',
      text: `Tu vas a eliminar al ${usuario.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#31D2F2',
      cancelButtonColor: '#BD1E2C',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.eliminarUsuario(usuario.uid!).subscribe(() => {
          this.consularUsuarios();
          Swal.fire(
            'Usuario eliminado!',
            `${usuario.nombre} fue eliminado correctamente.`,
            'success'
          );
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuariosService.guardarUsuario(usuario).subscribe((resp) => {
      console.log('Role actualizado:', resp);
    });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }
}
