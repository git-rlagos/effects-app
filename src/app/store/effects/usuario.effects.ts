import * as usuarioActions from '../actions/usuario.actions';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from "@angular/core";
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from "src/app/services/usuario.service";
import { of } from "rxjs";

@Injectable()
export class UsuarioEffects {

  constructor(
    // Los Actions de NgRx Effects están pendientes de todas las acciones de que disparan.
    // Son Observables que están escuchando las acciones.
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}


  cargarUsuarios$ =  createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      switchMap( (action) => {
          return this.usuarioService.getUserById(action.id).pipe(
              map((user: Usuario) => usuarioActions.cargarUsuarioSuccess({usuario: user}) ),
              catchError((error: Error) =>of(usuarioActions.cargarUsuarioError({payload: error}) ))
          );
      })
    )
  );


}
