import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';
import {FeiraProvider} from "../../providers/feira/feira.provider";
import {FeiraPage} from "../feira/feira";
import { Geolocation } from '@ionic-native/geolocation';
import {Feira} from "../../app/models/feira.model";

@Component({
  selector: 'page-feiras',
  templateUrl: 'feiras.html',
})
export class FeirasPage {

  public storage = constants.API_STORAGE;
  feiras: Feira[];
  dayNames = constants.dayNames;

  constructor(private feiraProvider: FeiraProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation) {
    this.feiraProvider.feiras().then((feiras) => {
      this.feiras = feiras;

      this.geolocation.watchPosition()
        .filter((position) => position.coords !== undefined)
        .subscribe((position) => {
          this.feiras.map((feira) => {

            feira.distancia = this.calculateDistance(feira.latitude, position.coords.latitude, feira.longitude, position.coords.longitude);
            return feira;

          })
        });
    });
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  goToFeiraPage(id : number) {
    this.navCtrl.push(FeiraPage, { id: id });
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    return parseFloat((12742 * Math.asin(Math.sqrt(a))).toPrecision(2)); // 2 * R; R = 6371 km
  }
}
