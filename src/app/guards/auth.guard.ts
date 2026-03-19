import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

const validarAutenticacion = () => {
  const usuariosService = inject(UsuariosService);
  const router = inject(Router);

  return usuariosService.validarToken().pipe(
    map((estaAutenticado) => {
      return estaAutenticado ? true : router.createUrlTree(['/auth/login']);
    })
  );
};

export const authGuard: CanActivateFn = () => validarAutenticacion();

export const authLoadGuard: CanLoadFn = () => validarAutenticacion();