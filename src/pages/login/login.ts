import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { TabsPage } from "../tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  
  backgrounds = [
    'assets/imgs/backgrounds/background-2.jpg',
    'assets/imgs/backgrounds/background-2.jpg',
    'assets/imgs/backgrounds/background-2.jpg',
    'assets/imgs/backgrounds/background-2.jpg'
  ];

  user : Observable<firebase.User>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authProvider: AuthProvider) {
    this.user = this.authProvider.currentUserObservable;
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.user.subscribe(user => {
      if(user) {
        this.authProvider.apiLogin().then(() => this.goToHomePage());
      }
    });
  }

  signInWithGoogle() {
    this.authProvider.googleLogin().then(() => {
      this.authProvider.apiLogin().then(() => {

        console.log(this.authProvider.currentUser);

        if(this.authProvider.authenticated) {
          this.goToHomePage();
        }
      });
    }, error => {
      // Put a toast here
    });
  }

  signOut() {
    this.authProvider.signOut();
  }

  goToHomePage() {
    this.navCtrl.push(TabsPage);
  }
}
