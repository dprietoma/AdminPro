import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medicos.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  private medicoService = inject(MedicoService);
  public modalImagenService = inject(ModalImagenService);
  private busquedasService = inject(BusquedasService);
  private router = inject(Router);

  // Variables
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarMedicos();
      });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  eliminarMedicos(medico: Medico) {
    this.medicoService.eliminarMedicos(medico._id!).subscribe((resp) => {
      Swal.fire('Eliminado', medico.nombre, 'success');
      this.cargarMedicos();
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }

    this.busquedasService
      .busqueda('medicos', termino)
      .subscribe((resultados: any) => {
        this.medicos = resultados;
      });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal(
      'medicos',
      medico._id!,
      medico.img,
    );
  }

  crearMedico() {
    this.router.navigate(['/dashboard/medico/nuevo']);
  }
}
