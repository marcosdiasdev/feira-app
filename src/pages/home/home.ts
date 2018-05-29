import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { constants } from '../../app/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
  items: string[];
  title = constants.APP_NAME;

  constructor(public navCtrl: NavController,
              private screenOrientation: ScreenOrientation,
              private platform: Platform) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    this.platform.ready().then(()=>{
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    })
  }

  initializeItems() {
    this.items = [
      'Tomate Cereja',
      'Batata Inglesa',
      'Alface Americana'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }  

}
