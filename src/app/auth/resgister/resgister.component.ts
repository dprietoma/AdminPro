import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

function passwordsIguales(group: AbstractControl): ValidationErrors | null {
  const p1 = group.get('password')?.value;
  const p2 = group.get('password2')?.value;
  if (!p1 || !p2) return null;          // si falta algo, no muestres "no iguales" aún
  return p1 === p2 ? null : { noIguales: true };
}

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./register.component.css'],
})
export class ResgisterComponent {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);


  formRegister: any  = this.fb.group(
    {
      nombre: ['David', [Validators.required, Validators.minLength(3)]],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      password2: ['123456', [Validators.required, Validators.minLength(6)]],
      terminos: [true, Validators.requiredTrue],
    },
    { validators: [passwordsIguales] } // validador a nivel de formulario
  );

  crearUsuario() {
    this.formRegister.markAllAsTouched(); // en submit fuerza a mostrar todo
    if (this.formRegister.invalid) return;

    this.usuariosService.crearUsuario(this.formRegister.value).subscribe((resp) => {

      this.router.navigateByUrl('/');

    }, (err) => {
      // Si sucede un error
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  // Mostrar error mientras escribe:
  mostrarError(campo: string): boolean {
    const control = this.formRegister.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Error de contraseñas:
  mostrarErrorPasswords(): boolean {
    // error a nivel de form + que el usuario ya interactuó con password2 (o password)
    const formError = this.formRegister.errors?.['noIguales'];
    const p2 = this.formRegister.get('password2');
    return !!(formError && p2 && (p2.dirty || p2.touched));
  }

  // Para mensajes específicos (opcional, recomendado)
  error(campo: string, tipo: string): boolean {
    const c = this.formRegister.get(campo);
    return !!(c && c.hasError(tipo) && (c.dirty || c.touched));
  }
}