import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { constants } from '../../app/constants';

@Injectable()
export class ProdutorService {
    constructor(private http: HttpClient){ }

    produtorById(id: string): Observable<any> {
        return this.http.get<any>(`${constants.API_ENDPOINT}/produtor/${id}`)
      }
}