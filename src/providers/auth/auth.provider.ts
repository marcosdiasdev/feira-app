import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

import {User} from "firebase";
import * as firebase from 'firebase/app';
import UserCredential = firebase.auth.UserCredential;
import {constants, firebaseConfig} from '../../app/constants';

import { AngularFireAuth } from 'angularfire2/auth';
import {HttpClient} from "@angular/common/http";
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import {User as APIUser} from "../../app/models/user.model";
import {SessionProvider} from "../session/session";


@Injectable()
export class AuthProvider {

	  private authState: firebase.User = null;

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
     * @param user -
     */
    createSession(user: APIUser) {
      return this.sessionProvider.create('user', user);
    }

    getSession(): Promise<any> {
      return this.sessionProvider.get('user');
    }

    removeSession(): Promise<any> {
      return this.sessionProvider.remove('user');
    }

  /**
   * Logs in to the API
   * Must be called after googleLogin() succeeded
   */
  public apiLogin(): Observable<any> {
      let url = `${constants.API_ENDPOINT}/signin`;
      let request = { uid: this.authState.uid, email: this.authState.email };
      return this.http.post(url, request)
        .map((userData : APIUser) => {
          return new APIUser().deserialize(userData);
        });
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
          console.error(err);
        }
    }

    /**
     * Google login method for native devices
     */
    public async nativeGoogleLogin(): Promise<User> {
          try {

            let gplusUser = await this.gplus.login({
                'webClientId': firebaseConfig.webClientId,
                'offline': true,
                'scopes': 'profile email'
            })
            .then(gplusUser => {
                return gplusUser
            })
            .catch(err => console.error(err));

            let credentials = firebase.auth.GoogleAuthProvider.credential(null, gplusUser.accessToken);
            return await this.afAuth.auth.signInWithCredential(credentials);

          } catch(err) {
              console.error(err)
          }
      }

    /**
     * AngularFireAuth logout
     */
    public signOut(): Promise<void> {
          return this.afAuth.auth.signOut();
      }
}
