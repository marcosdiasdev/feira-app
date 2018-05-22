import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { constants } from '../../app/constants';

/*
  Generated class for the ProdutorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutorProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProdutorProvider Provider');
  }
  
  produtorById(id: number): Observable<any> {
    let url = `${constants.API_ENDPOINT}/produtores/${id}`;
    console.log(url)
    return this.http.get<any>(url);
  }
}
