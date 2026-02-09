import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private fileUploadService = inject(FileUploadService);

  public perfilForm!: FormGroup;
  public usuario: Usuario;


  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor() {
    this.usuario = this.usuariosService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [
        this.usuario.nombre,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuariosService
      .actualizarUsuario(this.perfilForm.value)
      .subscribe((resp: any) => {
        this.usuario.nombre = this.perfilForm.value.nombre;
        this.usuario.email = this.perfilForm.value.email;
        Swal.fire('Guardado', 'Perfil actualizado con exito', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
      });
  }

  cambiarImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0){
      this.imagenSubir = undefined!;
      this.imgTemp = null;
      return;
    } 

    const file = input.files[0];
    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  actualizarImagen() {
    const archivo = this.imagenSubir; // Aquí deberías obtener el archivo seleccionado por el usuario
    this.fileUploadService
      .actualizarFoto(archivo, 'usuarios', this.usuario.uid || '')
      .then((nombreArchivo) => {
        this.usuario.img = nombreArchivo;
        Swal.fire('Imagen Actualizada', 'La imagen de usuario se ha actualizado', 'success');
      })
      .catch((err) => {
        console.error('Error al actualizar la imagen:', err);
      });
  }

  
}
