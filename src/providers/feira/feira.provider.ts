import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { constants } from '../../app/constants';

@Injectable()
export class FeiraProvider {

  constructor(public http: HttpClient) {
    
  }
  
  feiraById(id: number): Observable<any> {
    let url = `${constants.API_ENDPOINT}/feiras/${id}`;
    return this.http.get<any>(url);
  }
}
