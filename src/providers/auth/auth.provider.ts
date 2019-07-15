import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {User} from "firebase";
import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import {constants, firebaseConfig} from '../../app/constants';

import { AngularFireAuth } from 'angularfire2/auth';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

import {SessionProvider} from "../session/session";
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthProvider {

  jwtHelper = new JwtHelper();
  private authState: firebase.User = null;
  userSession;
  gplusUser;

  constructor(public afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform,
              private http: HttpClient,
              private sessionProvider: SessionProvider) {

    afAuth.authState.subscribe(user => {
      this.authState = user;
    });
  }

  /**
   *
   * @param
   */
  createSession(sessionData) {
    return this.sessionProvider.create('user', sessionData)
      .then(sessionData => this.userSession = sessionData);
  }

  getSession(): Promise<any> {
    return this.sessionProvider.get('user')
      .then(sessionData => this.userSession = sessionData);
  }

  removeSession(): Promise<any> {
    return this.sessionProvider.remove('user');
  }

  makeSessionData(token) {
    let user_id = this.jwtHelper.decodeToken(token).sub;
    return {
      token: token,
      id: user_id,
      displayName: this.currentUser.displayName,
      email: this.currentUser.email,
      photoURL: this.currentUser.photoURL,
    };
  }

  /**
   * Logs in to the API
   * Must be called after googleLogin() succeeded
   */
  public apiSignIn(): Observable<any> {
    let url = `${constants.API_ENDPOINT}/auth/signin`;
    let request = { email: this.authState.email, password: this.authState.uid, name: this.authState.displayName };
    return this.http.post(url, request);
  }

  public apiSignOut(): Observable<any> {
    let url = `${constants.API_ENDPOINT}/auth/signout`;
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userSession.token);
    return this.http.post(url, null, {headers: headers});
  }

  /**
   * AngularFireAuth related methods
   */

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  /**
   * This method will call the right Google login method based on the platform
   */
  public googleLogin(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.nativeGoogleLogin();
    } else {
      return this.webGoogleLogin();
    }
  }

  /**
   * Google login method for web devices
   */
  public async webGoogleLogin(): Promise<UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this.afAuth.auth.signInWithPopup(provider);
    } catch(err) {
      console.error(JSON.stringify(err));
    }
  }

  /**
   * Google login method for native devices
   */
  public async nativeGoogleLogin(): Promise<User> {
    try {

      this.gplusUser = await this.gplus.login({
        'webClientId': firebaseConfig.webClientId,
        'offline': true,
        'scopes': 'profile email'
      })
        .then(gplusUser => gplusUser)
        .catch(err => {
          throw new Error(err);
        });

      let credentials = firebase.auth.GoogleAuthProvider.credential(null, this.gplusUser.accessToken);
      return await this.afAuth.auth.signInWithCredential(credentials);

    } catch(err) {
      throw new Error(err);
    }
  }

  getAuthHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.userSession.token);
  }

  /**
   * App signout
   */
  public signOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(() => {
      this.apiSignOut().subscribe(() => {
        this.removeSession();
      });
    });
  }
}
