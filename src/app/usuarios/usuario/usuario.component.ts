import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario } from '../../store/actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario?: Usuario;
  usuarioSubs?: Subscription;

  constructor(private router: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.usuarioSubs = this.store.select('usuario').subscribe(
      ({ user, loading, error }) => {
        if(user){
          this.usuario = user;
        }
    });

    this.router.params.subscribe( ({id}) => {
      this.store.dispatch( cargarUsuario({id}));
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubs?.unsubscribe();
  }

}
