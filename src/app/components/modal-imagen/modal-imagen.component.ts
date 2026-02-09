import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css'],
})
export class ModalImagenComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;
  
  public modalImagenService = inject(ModalImagenService);
  private fileUploadService = inject(FileUploadService);

  public imagenSubir!: File;
  public imgTemp: any = null;


  cerrarModal() {
    this.limpiarFileName();
    this.imgTemp = null;
    this.imagenSubir = undefined!;
    this.modalImagenService.cerrarModal();
  }

  limpiarFileName() {
    const fileName = this.fileInput?.nativeElement;
     if (fileName) fileName.value = '';
  }

  cambiarImagen(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
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
    const tipo  = this.modalImagenService.tipo;
    const uid  = this.modalImagenService.id;


    const archivo = this.imagenSubir; // Aquí deberías obtener el archivo seleccionado por el usuario
    this.fileUploadService
      .actualizarFoto(archivo, tipo, uid || '')
      .then((img) => {
        Swal.fire(
          'Imagen Actualizada',
          'La imagen se ha actualizado',
          'success',
        );
        this.cerrarModal();
        this.modalImagenService.nuevaImagen.emit(img);
      })
      .catch((err) => {
        console.error('Error al actualizar la imagen:', err);
      });
  }
}
