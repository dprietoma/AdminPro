import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.models';
import { Medico } from 'src/app/models/medicos.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private hospitalService = inject(HospitalService);
  private medicoService = inject(MedicoService);
  private router = inject(Router);
  private activatedRouter = inject(ActivatedRoute);

  public medicoForm!: FormGroup;

  // Variables
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({ id }) => {
      this.obtenerMedicoById(id);
    });

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges.subscribe((hospitalId) => {
      this.hospitalSeleccionado = this.hospitales.find(
        (h) => h._id === hospitalId,
      )!;
    });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    if (this.medicoForm.invalid) {
      return;
    }

    if (this.medicoSeleccionado) {
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id!,
      };

      // // actualizar
      this.medicoService.actualizarMedicos(data).subscribe((res) => {
        Swal.fire(
          'Actulizado',
          `El médico ${nombre} fue actualizado correctamente`,
          'success',
        );
      });
    } else {
      // crear
      this.medicoService
        .crearMedicos(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire(
            'Creado',
            `El médico ${nombre} fue creado correctamente`,
            'success',
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }

  obtenerMedicoById(id: string): void {
    if (id === 'nuevo') return;

    this.medicoService.obtenerMedicoById(id)
    .pipe(
      delay(100)
    )
    .subscribe({
      next: (medico) => {
        const nombre = medico?.nombre ?? '';
        const hospitalId = medico?.hospital?._id ?? null;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: hospitalId });
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          Swal.fire(
            'Medico',
            err.error?.msg ?? 'Medico no encontrado',
            'warning',
          );
          this.router.navigateByUrl('/dashboard/medicos');
          return;
        }

        Swal.fire(
          'Error',
          err.error?.msg ?? 'Error consultando el médico',
          'error',
        );
      },
    });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }
}
