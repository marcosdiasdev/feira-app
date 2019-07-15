import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth.provider';
import { TabsPage } from "../tabs/tabs";

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

  ionViewDidEnter() {

  }

  goToHomePage() {
    this.navCtrl.push(TabsPage);
  }
  
  signInWithGoogle() {
    this.authProvider.googleLogin().then((data) => {
      this.authProvider.apiSignIn().subscribe((token) => {
        if(token.access_token) {
          let sessionData = this.authProvider.makeSessionData(token.access_token);
          this.authProvider.createSession(sessionData).then(() => this.goToHomePage());
        }
      });
    }).catch(error => console.log(JSON.stringify(error)));
  }
  
  /*
  signInWithGoogle() {
    this.authProvider.apiSignIn().subscribe((token) => {
      let tokenData = this.jwtHelper.decodeToken(token.access_token);

      if(tokenData.id > 0) {
        let user = new User().deserialize({
          id: tokenData.sub,
          uid: 'rW1a5Pvl0LepxINYhckWFrRpGVm1',
          displayName: 'Marcos Dias',
          email: 'marcos.conceicao@ifto.edu.br',
          photoURL: '',
        });
        //this.authProvider.createSession(user);
        //this.goToHomePage();
      }
    });
  }
  */
  
}
