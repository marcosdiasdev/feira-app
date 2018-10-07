import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { TabsPage } from "../tabs/tabs";
import { User } from "../../app/models/user.model";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user : Observable<firebase.User>;

  constructor(public navCtrl: NavController,
              private authProvider: AuthProvider) {
    this.user = this.authProvider.currentUserObservable;
  }

  goToHomePage() {
    this.navCtrl.push(TabsPage);
  }

  signInWithGoogle() {
    this.authProvider.googleLogin().then(() => {
      this.authProvider.apiLogin().subscribe((userData: User) => {
        if(userData.id > 0) {

          let user = new User().deserialize({
            id: userData.id,
            created_at: userData.created_at,
            uid: this.authProvider.currentUser.uid,
            displayName: this.authProvider.currentUser.displayName,
            email: this.authProvider.currentUser.email,
            photoURL: this.authProvider.currentUser.photoURL,
          });
          this.authProvider.createSession(user).then(() => this.goToHomePage());
        }
      });
    });
  }

  signInWithGoogle2() {
    this.authProvider.apiLogin().subscribe((userData: User) => {
      if(userData.id > 0) {
        let user = new User().deserialize({
          id: userData.id,
          created_at: userData.created_at,
          uid: '',
          displayName: 'Marcos Dias',
          email: 'ti.marcosdias@gmail.com',
          photoURL: '',
        });
        this.authProvider.createSession(user);
        this.goToHomePage();
      }
    });
  }
}
