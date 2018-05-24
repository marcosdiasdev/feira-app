import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';
import { PropriedadeProvider } from '../../providers/propriedade/propriedade';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-propriedade',
  templateUrl: 'propriedade.html',
})
export class PropriedadePage {
  
  public map: GoogleMap;
  public propriedade;
  private propriedade_id;
  
  constructor(public navCtrl: NavController,
              public propriedadeProvider: PropriedadeProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.propriedade = {"id":1,"produtor_id":1,"nome":"Fazenda Cana\u00e3","descricao":"A Fazenda Cana\u00e3 foi fundada em meados de 2001 no munic\u00edpio de Porto Alegre-TO e \u00e9 l\u00edder na produ\u00e7\u00e3o de abacaxi na regi\u00e3o do sudeste tocantinense.","latitude":-11.6058409999999998518660504487343132495880126953125,"longitude":-47.01233500000000020691004465334117412567138671875,"created_at":"2018-05-23 14:07:36","updated_at":null}
    this.loadMap(this.propriedade.latitude, this.propriedade.longitude);
    this.addMarker(this.propriedade.nome, this.propriedade.latitude, this.propriedade.longitude);
    /*
    console.log('ionViewDidLoad PropriedadePage');
    this.propriedade_id = this.navParams.data.qrData;
    this.propriedadeProvider.propriedadeById(this.propriedade_id)
      .subscribe(produtor => {
        this.propriedade = produtor;
        console.log('Got data: ' + JSON.stringify(this.propriedade));
        this.loadMap(this.propriedade.latitude, this.propriedade.longitude);
        this.addMarker(this.propriedade.nome, this.propriedade.latitude, this.propriedade.longitude);
      },
      error => {
        console.log('Unable to get data.')
      });
      */
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
