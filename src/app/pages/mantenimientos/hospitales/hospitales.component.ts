import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.models';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  private hospitalesService = inject(HospitalService);
  public modalImagenService = inject(ModalImagenService);
  private busquedasService = inject(BusquedasService);

  // Variables
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarHospitales();
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalesService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  actualizarHospitales(hospital: Hospital) {
    this.hospitalesService
      .actualizarHospitales(hospital._id!, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
        this.cargarHospitales();
      });
  }

  eliminarHospitales(hospital: Hospital) {
    this.hospitalesService
      .eliminarHospitales(hospital._id!)
      .subscribe((resp) => {
        Swal.fire('Eliminado', hospital.nombre, 'success');
        this.cargarHospitales();
      });
  }

  async abrirSweetAlert() {
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,
      inputValidator: (val) => {
        if (!val || !val.trim()) return 'Debes ingresar un nombre';
        return null;
      },
    });

    if (value) {
      const nombre = value.trim();
      this.hospitalesService.crearHospitales(nombre).subscribe(() => {
        Swal.fire('Creado', nombre, 'success');
        this.cargarHospitales();
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id!,
      hospital.img,
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      this.cargarHospitales();
      return;
    }

    this.busquedasService
      .busqueda('hospitales', termino)
      .subscribe((resultados: any) => {
        this.hospitales = resultados;
      });
  }
}
