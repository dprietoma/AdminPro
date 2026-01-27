import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  private fb = inject(FormBuilder);
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  private ngzone = inject(NgZone);

  @ViewChild('googleBtn', { static: true })
  googleBtn!: ElementRef<HTMLDivElement>;

  formLogin: any = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    recorardarme: [false],
  });

  ngAfterViewInit(): void {
    this.googleLogin();
  }

  googleLogin(): void {
    const google = window.google;

    // Si aún no cargó el script, reintenta
    if (!google?.accounts?.id) {
      setTimeout(() => this.googleLogin(), 200);
      return;
    }

    google.accounts.id.initialize({
      client_id:
        '949034051464-caehle87gp3matf9anqrp90r1rudl849.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'rectangular',
      width: 320,
    });
  }

  handleCredentialResponse(response: any): void {
    this.usuariosService.loginGoogle(response.credential).subscribe(
      (resp) => {
        this.ngzone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

  login() {
    this.formLogin.markAllAsTouched(); // en submit fuerza a mostrar todo
    if (this.formLogin.invalid) return;
    this.usuariosService.LoginUsuario(this.formLogin.value).subscribe(
      (resp) => {
        if (this.formLogin.get('recorardarme').value) {
          localStorage.setItem('email', this.formLogin.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.ngzone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      (err) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
  }

  // Para mensajes específicos (opcional, recomendado)
  error(campo: string, tipo: string): boolean {
    const c = this.formLogin.get(campo);
    return !!(c && c.hasError(tipo) && (c.dirty || c.touched));
  }
}
