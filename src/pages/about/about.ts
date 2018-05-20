import { Component, ViewChild } from '@angular/core';
import { AlertController, Content } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { ProdutorPage } from '../produtor/produtor';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  @ViewChild(Content) content;

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.scan();
  }

  ionViewWillLeave() {
    this.qrScanner.destroy();
  }

  scan() {
    let scanSub = this.qrScanner.scan().subscribe((data: string) => {

      this.qrScanner.hide(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning

      // Navigates to ProdutorPage with data read from QR Scanner
      this.navCtrl.push(ProdutorPage, {
        qrData: data
      });
    });
    this.qrScanner.show();
  }
}