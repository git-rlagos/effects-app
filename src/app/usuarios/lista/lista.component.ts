import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  usersSubs?: Subscription;
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.usersSubs = this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;

    });

    this.store.dispatch( cargarUsuarios() );

    // this.usuarioService.getUsers().subscribe( users => {
    //   this.usuarios = users;
    // });

  }

  ngOnDestroy(): void {
    this.usersSubs?.unsubscribe();
  }

}
