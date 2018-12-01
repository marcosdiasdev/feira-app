import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { constants } from '../../app/constants';
import {Oferta} from "../../app/models/oferta.model";
import {Feira} from "../../app/models/feira.model";

@Injectable()
export class FeiraProvider {

  constructor(public http: HttpClient) {
    
  }
  
  feiraById(id: number): Observable<Feira> {
    let url = `${constants.API_ENDPOINT}/feiras/${id}`;
    return this.http.get<Feira>(url);
  }

  feiras(): Promise<Feira[]> {
    let url = `${constants.API_ENDPOINT}/feiras`;
    return this.http.get<Feira[]>(url)
      .map((feiras : Feira[]) => {
        return feiras.map((feira) => new Feira().deserialize(feira))
      }).toPromise();
  }
}
