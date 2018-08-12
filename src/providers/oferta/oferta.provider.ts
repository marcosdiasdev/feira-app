import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { constants } from '../../app/constants';
import { Oferta } from '../../app/models/oferta.model';

@Injectable()
export class OfertaProvider {

  constructor(public http: HttpClient) {

  }

  ofertaById(id: number): Observable<Oferta> {
    let url = `${constants.API_ENDPOINT}/ofertas/${id}`;
    console.log(url)
    return this.http.get<Oferta>(url);
  }
 
  ofertas(): Observable<Oferta[]> {
    //let url = `${constants.API_ENDPOINT}/ofertas?weeks=1`;
    let url = `${constants.API_ENDPOINT}/ofertas`;
    return this.http.get<Oferta[]>(url)
      .map((ofertas : Oferta[]) => {
        return ofertas.map((oferta: Oferta) => new Oferta().deserialize(oferta))
      })
  }
}
