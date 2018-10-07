import { Component } from '@angular/core';

import { QRPage } from '../qr/qr';
import { HomePage } from '../home/home';
import { FeirasPage } from '../feiras/feiras';
import { ContactPage } from "../contact/contact";
import {App} from "ionic-angular";
import {AuthProvider} from "../../providers/auth/auth.provider";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FeirasPage;
  tab3Root = QRPage;
  tab4Root = ContactPage;

  constructor(public app: App,
              public authProvider: AuthProvider) {
  }

  ionViewCanEnter() {
  }
}
