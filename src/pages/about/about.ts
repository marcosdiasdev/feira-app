import { Component, ViewChild } from '@angular/core';
import { AlertController, Content } from 'ionic-angular';
import { NavController, Platform } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  @ViewChild(Content) content;

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              public alertCtrl: AlertController,
              private platform: Platform) {
  }

  ionViewDidEnter() {
    this.scan();
  }

  ionViewWillLeave() {
    this.qrScanner.destroy();
  }

  scan() {
    console.log('Started sacanning...')
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {

      let alert = this.alertCtrl.create({
        title: 'QR Code Encontrado',
        subTitle: `O valor ${text} foi lido com sucesso.`,
        buttons: ['OK']
      });

      this.qrScanner.hide(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning
      alert.present();
    });

    this.qrScanner.show();
  }
}