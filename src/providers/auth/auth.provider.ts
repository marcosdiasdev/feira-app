
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import {constants, firebaseConfig} from '../../app/constants';

import {HttpClient} from "@angular/common/http";
import UserCredential = firebase.auth.UserCredential;

export class User {
  id;
  uid;
  createdAt;
  email;
  displayName;
  photoURL;
}

@Injectable()
export class AuthProvider {
	  private authState: firebase.User = null;

    constructor(public afAuth: AngularFireAuth,
                private gplus: GooglePlus,
                private platform: Platform,
                private http: HttpClient) {

        afAuth.authState.subscribe(user => {
            this.authState = user;
        });
    }

    get authenticated(): boolean {
      return this.authState !== null;
    }

    get currentUser(): any {
      return this.authenticated ? this.authState : null;
    }

    get currentUserObservable(): any {
      return this.afAuth.authState;
    }

    public async apiLogin() {
      if(this.authenticated) {
        let url = `${constants.API_ENDPOINT}/signin`;
        let request = { uid: this.authState.uid, email: this.authState.email };
        await this.http.post(url, request).subscribe(userData => {
          this.authState.id = userData.id;
          this.authState.createdAt = userData.created_at;
        });
      }
    }

    public googleLogin(): Promise<any> {
      if (this.platform.is('cordova')) {
        return this.nativeGoogleLogin();
      } else {
        return this.webGoogleLogin();
      }
    }

    public async webGoogleLogin(): Promise<UserCredential> {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        return await this.afAuth.auth.signInWithPopup(provider);
      } catch(err) {
        console.error(err);
      }
    }

    public async nativeGoogleLogin() {
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

    public signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }
}
