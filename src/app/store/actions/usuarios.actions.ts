import { createAction, props } from '@ngrx/store';

import { Usuario } from '../../models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] cargarUsuarios');

export const cargarUsuariosSucess = createAction(
       '[Usuarios] cargar Usuarios Success',
        props<{usuarios: Usuario[]}>());

export const cargarUsuariosError = createAction(
       '[Usuarios] cargar Usuarios Error',
        props<{ payload: any}>());  // E payload será algo grande.

