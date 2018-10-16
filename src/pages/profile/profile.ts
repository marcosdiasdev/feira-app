import { Component } from '@angular/core';
import {App} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth.provider";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user;

  constructor(public app: App,
              private authProvider: AuthProvider) {
     this.authProvider.getSession().then(user => this.user = user);
  }

  ionViewDidEnter() {
    this.authProvider.getSession().then(data => console.log(data.token));
  }

  signOut() {
    this.authProvider.signOut().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
