import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';

@Component({
  selector: 'page-produtor',
  templateUrl: 'produtor.html',
})
export class ProdutorPage {

  public produtor;
  public isValid = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let data = this.navParams.data.qrData;

    if(data.substr(0, constants.QR_PATTERN.length) == constants.QR_PATTERN) {
      this.isValid = true;
      this.produtor = data;
    } else {
      this.produtor = 'Código QR inválido. Este produtor não está registrado no ' + constants.APP_NAME;
    } 
  }
}
