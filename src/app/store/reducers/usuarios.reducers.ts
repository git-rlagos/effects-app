import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSucess } from '../actions';
import { createReducer, on } from '@ngrx/store';

import { Usuario } from 'src/app/models/usuario.model';

export interface UsuariosState {
    users  : Usuario[],
    loaded : boolean,
    loading: boolean,
    error  : any,
    // user   : Usuario[]
}

export const usuariosInitialState: UsuariosState = {
    users  : [],
    loaded : false,
    loading: false,
    error  : null,
    // user   : [],
}

export const usuariosReducer = createReducer(
  usuariosInitialState,
  on(cargarUsuarios, state => ({ ...state, loading: true})),

  on(cargarUsuariosSucess, (state, { usuarios }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [ ...usuarios]
  })),

  on(cargarUsuariosError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  }))
);
