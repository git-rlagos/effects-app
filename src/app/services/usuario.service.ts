import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any>(`${ this.url }/users?per_page=6`)
            .pipe(
                map( respuesta => respuesta['data'] )
            );
  }

}
