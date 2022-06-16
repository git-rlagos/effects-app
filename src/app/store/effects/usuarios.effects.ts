import * as usuariosActions from '../actions/usuarios.actions';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuariosSucess } from '../actions/usuarios.actions';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {

  constructor(
    // Los Actions de NgRx Effects están pendiente de todas las acciones de que disparan.
    // Son Observables que están escuchando las acciones.
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  // Primera configuración del Effect
  cargarUsuarios$ = createEffect(
    // El createEffect necesita un Observable, y se lo damos de esta manera:
    () => this.actions$.pipe(
      // Evalúe la acción (no la cargue), cualquier otra acción no pasa del ofType.
      ofType( usuariosActions.cargarUsuarios ),
       // Quiero disparar un nuevo Observable y que se una a la petición anterior
       switchMap(
          () => this.usuarioService.getUsers()
                .pipe(
                    map( (users: Usuario[]) => usuariosActions.cargarUsuariosSucess({usuarios: users}),
                    catchError( (err: Error) => of(usuariosActions.cargarUsuariosError({payload: err}))) )
                  )
          )
      )
  );


}
