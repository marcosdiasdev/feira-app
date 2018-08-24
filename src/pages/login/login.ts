import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  
  backgrounds = [
    'assets/imgs/backgrounds/background-1.jpg',
    'assets/imgs/backgrounds/background-2.jpg',
    'assets/imgs/backgrounds/background-3.jpg',
    'assets/imgs/backgrounds/background-4.jpg'
  ];

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {

    this.user = this.afAuth.authState;

  }

  ionViewDidLoad() {
    console.log(this.user)
  }

  signInWithGoogle() {
    this.authService.googleLogin();
  }

  signOut() {
    this.authService.signOut();
  }

}
