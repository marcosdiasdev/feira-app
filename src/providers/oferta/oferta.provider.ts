import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { constants } from '../../app/constants';
import { Oferta } from '../../app/models/oferta.model';
import { AuthProvider } from "../auth/auth.provider";

@Injectable()
export class OfertaProvider {

  constructor(public http: HttpClient,
              private authProvider: AuthProvider) {

  }

  ofertaById(id: number): Observable<Oferta> {
    let url = `${constants.API_ENDPOINT}/ofertas/${id}`;
    return this.http.get<Oferta>(url);
  }
 
  ofertas(): Observable<Oferta[]> {
    //let url = `${constants.API_ENDPOINT}/users/ofertas?weeks=1`;
    let url = `${constants.API_ENDPOINT}/users/ofertas`;
    let headers = this.authProvider.getAuthHeaders();
    return this.http.get<Oferta[]>(url, {headers: headers})
      .map((ofertas : Oferta[]) => {
        return ofertas.map((oferta: Oferta) => new Oferta().deserialize(oferta))
      });
  }
}
