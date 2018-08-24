
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { firebaseConfig } from '../../app/constants';

//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()

export class AuthService {
	private user: firebase.User;

    constructor(public afAuth: AngularFireAuth,
                private gplus: GooglePlus,
                private platform: Platform) {

        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }


    async nativeGoogleLogin(): Promise<firebase.User> {
        try {
      
          const gplusUser = await this.gplus.login({
            'webClientId': firebaseConfig.webClientId,
            'offline': true,
            'scopes': 'profile email'
          })
          
          return await this.afAuth.auth.signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
          )
        } catch(err) {
          console.log(err)
        }
      }
    
      async webGoogleLogin(): Promise<void> {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const credential = await this.afAuth.auth.signInWithPopup(provider);
        } catch(err) {
          console.log(err)
        }
      }
    
      googleLogin() {
        if (this.platform.is('cordova')) {
          this.nativeGoogleLogin().then( result => { console.log(result)});
        } else {
          this.webGoogleLogin().then( result => { console.log(result)});
        }
      }
      
      signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
      }

      get authenticated(): boolean {
        return this.user !== null;
      }

      getEmail() {
        return this.user && this.user.email;
      }      
}