import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';
import { PropriedadeProvider } from '../../providers/propriedade/propriedade.provider';
import { GoogleMaps, GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';

@Component({
  selector: 'page-propriedade',
  templateUrl: 'propriedade.html',
})
export class PropriedadePage {
  
  public map: GoogleMap;
  public propriedade;
  private propriedade_id;
  public storage = constants.API_STORAGE;
  
  constructor(public navCtrl: NavController,
              public propriedadeProvider: PropriedadeProvider,
              public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.propriedade_id = this.navParams.data.qrData;
    this.propriedadeProvider.propriedadeByIdWithRelations(this.propriedade_id)
      .subscribe(propriedade => {
        this.propriedade = propriedade;
        this.loadMap(this.propriedade.latitude, this.propriedade.longitude);
        this.addMarker(this.propriedade.nome, this.propriedade.latitude, this.propriedade.longitude);
      },
      error => {
        console.log('Unable to get data.')
      });
  }

  ionViewWillLeave() {

  }

  loadMap(latitude, longitude) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 12
      }
    };
    this.map = GoogleMaps.create('map-canvas', mapOptions);
  }
   
  addMarker(title, latitude, longitude) {
    this.map.addMarker({
      title: title,
      animation: 'DROP',
      position: {
        lat: latitude,
        lng: longitude
      }
    });
  }
}
