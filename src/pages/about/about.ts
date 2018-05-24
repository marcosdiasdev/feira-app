import { Component, ViewChild } from '@angular/core';
import { AlertController, Content } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { PropriedadePage } from '../propriedade/propriedade';
import { constants } from '../../app/constants';

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
      console.log('Got a QR Code.')
      // If the code matches de pattern
      if(data.substr(0, constants.QR_PATTERN.length) == constants.QR_PATTERN) {
        this.qrScanner.hide(); // hide camera preview
        scanSub.unsubscribe(); // stop scanning
        // Navigates to ?Page with data read from QR Scanner
        this.navCtrl.push(PropriedadePage, {
          qrData: data.split('=')[1]
        });
      } else {
          console.log('Invalid QR Code. Rescaning...')
          this.scan();
      }
    });
    this.qrScanner.show();
  }
}