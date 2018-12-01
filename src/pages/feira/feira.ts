import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeiraProvider } from '../../providers/feira/feira.provider';
import { constants } from '../../app/constants';

@Component({
  selector: 'page-feira',
  templateUrl: 'feira.html',
})
export class FeiraPage {

  public feira = { id: null};
  public dayNames = constants.dayNames;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private feiraProvider: FeiraProvider) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter() {    
    this.feira.id = this.navParams.data.id;
    this.feiraProvider.feiraById(this.feira.id)
      .subscribe(feira => {
        this.feira = feira;
        //this.loadMap(this.propriedade.latitude, this.propriedade.longitude);
        //this.addMarker(this.propriedade.nome, this.propriedade.latitude, this.propriedade.longitude);
      },
      error => {
        console.log('Unable to get data.')
      });
  }  

}
