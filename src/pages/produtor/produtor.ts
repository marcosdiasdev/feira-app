import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { constants } from '../../app/constants';
import { ProdutorProvider } from '../../providers/produtor/produtor';

@Component({
  selector: 'page-produtor',
  templateUrl: 'produtor.html',
})
export class ProdutorPage {

  public produtor;
  public produtor_id;
  public isValid = true;

  constructor(public navCtrl: NavController,
              public produtorProvider: ProdutorProvider,
              public navParams: NavParams) {
                console.log("Produtor initialized")
  }

  ionViewDidLoad() {
    /*
    this.produtor_id = this.navParams.data.qrData;
    this.produtorProvider.produtorById(this.produtor_id)
      //.subscribe(produtor => this.produtor = produtor);
      .subscribe(produtor => console.log("Did load: " + JSON.stringify(produtor)))
  }
  */

  this.produtor_id = this.navParams.data.qrData;
  this.produtorProvider.produtorById(this.produtor_id)
    .subscribe(produtor => {
      this.produtor = produtor
      console.log('Got data: ' + JSON.stringify(this.produtor))
    },
    error => {
      console.log('Unable to get data.')
    });
}  

}
