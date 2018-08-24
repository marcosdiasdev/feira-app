import { Component } from '@angular/core';

import { QRPage } from '../qr/qr';
import { HomePage } from '../home/home';
import { FeirasPage } from '../feiras/feiras';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FeirasPage;
  tab3Root = QRPage;
  tab4Root = LoginPage;

  constructor() {

  }
}
