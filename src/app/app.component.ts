import {Component, ViewChild} from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {TabsPage} from "../pages/tabs/tabs";
import {AuthProvider} from "../providers/auth/auth.provider";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav;
  rootPage:any = LoginPage;

  constructor(platform: Platform,
              app: App,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private screenOrientation: ScreenOrientation,
              private authProvider: AuthProvider) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        if(platform.is('cordova')) {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        }
      });
  }

  ngAfterViewInit() {

    this.authProvider.getSession().then(session => {
      console.log(session);
      if(session)
        this.nav.push(TabsPage);
    });

  }
}
