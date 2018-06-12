import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfertaProvider } from '../../providers/oferta/oferta.provider';

@Component({
  selector: 'page-oferta',
  templateUrl: 'oferta.html',
})
export class OfertaPage {

  public oferta = { id: null }
  public JSON = JSON;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ofertaProvider: OfertaProvider) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {    
    this.oferta.id = this.navParams.data.id;
    this.ofertaProvider.ofertaById(this.oferta.id)
      .subscribe(oferta => {
        this.oferta = oferta;
      },
      error => {
        console.log('Unable to get data.')
      });
  }    

}
