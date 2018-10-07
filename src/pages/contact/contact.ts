import { Component } from '@angular/core';
import {App} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth.provider";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user;

  constructor(public app: App,
              private authProvider: AuthProvider) {
     this.authProvider.getSession().then(user => this.user = user);
  }

  ionViewDidEnter() {

  }

  signOut() {
    this.authProvider.removeSession().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
