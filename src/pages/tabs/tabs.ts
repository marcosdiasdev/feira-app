import { Component } from '@angular/core';

import { QRPage } from '../qr/qr';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { PropriedadePage } from '../propriedade/propriedade';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = QRPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
