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

  user : Observable<firebase.User>;

  constructor(public app: App,
              private authProvider: AuthProvider) {
    this.user = this.authProvider.currentUserObservable;
  }

  ionViewDidEnter() {
    this.user.subscribe(user => console.log(user));
  }

  signOut() {
    this.authProvider.signOut().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
