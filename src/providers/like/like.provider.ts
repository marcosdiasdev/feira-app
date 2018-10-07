import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from '../../app/constants';
import { Like } from '../../app/models/like.model';

@Injectable()
export class LikeProvider {

  constructor(public http: HttpClient) {
  }

  getLikes(): Observable<Like[]> {
    let url = `${constants.API_ENDPOINT}/likes`;
    return this.http.get<Like[]>(url);
  }

  addLike(like: Like) {
    let url = `${constants.API_ENDPOINT}/likes`;
    return this.http.post(url, like);
  }

  removeLike(like: Like) {
    let url = `${constants.API_ENDPOINT}/likes/${like.oferta_id}/${like.app_user_id}`;
    return this.http.delete(url);
  }
}
