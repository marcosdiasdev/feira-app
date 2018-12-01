import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from '../../app/constants';
import { Like } from '../../app/models/like.model';
import {AuthProvider} from "../auth/auth.provider";

@Injectable()
export class LikeProvider {

  constructor(public http: HttpClient,
              private authProvider: AuthProvider) {
  }

  addLike(like: Like) {
    let url = `${constants.API_ENDPOINT}/users/likes`;
    let headers = this.authProvider.getAuthHeaders();
    return this.http.post(url, like, {headers: headers});
  }

  removeLike(like: Like) {
    let url = `${constants.API_ENDPOINT}/users/likes/${like.oferta_id}`;
    let headers = this.authProvider.getAuthHeaders();
    return this.http.delete(url, {headers: headers});
  }
}
