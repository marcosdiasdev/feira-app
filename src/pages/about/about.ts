import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import * as Constants from '../../app/constants';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              public alertCtrl: AlertController,
              private platform: Platform) {
  }

  ionViewDidEnter() {
    this.scan();
  }

  closeQrScanner() {
    this.qrScanner.hide().then(()=>{
      window.document.querySelector('ion-app').classList.remove('transparent');
    });
  }

  ngOnDestroy() {
    this.closeQrScanner();
  }  

  scan() {
    // start scanning
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {

      let alert = this.alertCtrl.create({
        title: 'QR Code Encontrado',
        subTitle: `O valor ${text} foi lido com sucesso.`,
        buttons: ['OK']
      });

      this.closeQrScanner(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning
      alert.present();
    });

    this.qrScanner.show().then(()=>{
      let unregister = this.platform.registerBackButtonAction(()=>{
          this.closeQrScanner();
          unregister();
      });
      window.document.querySelector('ion-app').classList.add('transparent');
    });
  }
}