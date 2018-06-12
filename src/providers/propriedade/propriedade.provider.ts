import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { constants } from '../../app/constants';

@Injectable()
export class PropriedadeProvider {

  constructor(public http: HttpClient) {  }

  propriedadeById(id: number): Observable<any> {
    let url = `${constants.API_ENDPOINT}/propriedades/${id}`;
    return this.http.get<any>(url);
  }

  propriedadeByIdWithRelations(id: number): Observable<any> {
    let url = `${constants.API_ENDPOINT}/propriedades/${id}?with=produtor+imagens`;
    console.log(url);
    return this.http.get<any>(url);
  }  
}
