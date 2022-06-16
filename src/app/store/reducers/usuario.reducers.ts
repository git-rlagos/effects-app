import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';
import { createReducer, on } from '@ngrx/store';

import { Usuario } from 'src/app/models/usuario.model';

export interface UsuarioState {
    id?     : string | null,
    user?   : Usuario | null,
    loaded : boolean,
    loading: boolean,
    error  : any,
}

export const UsuarioInitialState: UsuarioState = {
    id    : null,
    user  : null,
    loaded : false,
    loading: false,
    error  : null,
    // user   : [],
}

export const UsuarioReducer = createReducer(
  UsuarioInitialState,
  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id:  id
  })),

  on(cargarUsuarioSuccess, (state, { usuario }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: {...usuario},
  })),

  on(cargarUsuarioError, (state, { payload }) => ({
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
