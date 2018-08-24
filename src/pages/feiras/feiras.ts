import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';

/**
 * Generated class for the FeirasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feiras',
  templateUrl: 'feiras.html',
})
export class FeirasPage {

  public storage = constants.API_STORAGE;
  feiras = [
    { nome : 'Feira Verde', descricao : '...', latitude : -11.632567, longitude : -46.822331, dia_da_semana : 3, imagem : 'feira1.jpg'}, 
    { nome : 'Feira Verde', descricao : '...', latitude : -11.632567, longitude : -46.822331, dia_da_semana : 3, imagem : 'feira2.jpg'}, 
    { nome : 'Feira Verde', descricao : '...', latitude : -11.632567, longitude : -46.822331, dia_da_semana : 3, imagem : 'feira3.jpg'}, 
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeirasPage');
  }

}
