import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { constants } from '../../app/constants';
import { Oferta } from '../../app/models/oferta.model';
import { OfertaPage } from '../oferta/oferta';
import { FeiraPage } from '../feira/feira';
import { OfertaProvider } from '../../providers/oferta/oferta.provider';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LikeProvider } from '../../providers/like/like.provider';
import { Like } from '../../app/models/like.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('userLikes', [
      state('yes', style({
        color: '#FF5722',
        transform: 'scale(1.1)'
      })),
      state('no',   style({
        color: '#757575',
        transform: 'scale(1)'
      })),
      transition('no => yes', animate('100ms ease-in')),
      transition('yes => no', animate('100ms ease-out'))
    ])
  ]  
})
export class HomePage {

  searchQuery: string = '';
  items: Oferta[];
  items_backup: Oferta[];
  title = constants.APP_NAME;

  constructor(public navCtrl: NavController,
              private screenOrientation: ScreenOrientation,
              private platform: Platform,
              private ofertaProvider: OfertaProvider,
              private likeProvider: LikeProvider) {
    
    this.ofertaProvider.ofertas()
      .subscribe((ofertas: Oferta[]) => {
        this.items = ofertas
        this.items_backup = this.items
        console.log(this.items)
      },
      error => {
        console.log('Unable to get data: '  + error)
      });    
  }

  toggleLikeState(oferta : Oferta) {
    
    let like = new Like();
    like.app_user_id = 1
    like.oferta_id = 1
    
    oferta.toggleLikeState()

    if(oferta.user_likes == 'no') {
      this.likeProvider.removeLike(like)
        .subscribe(data => {
          console.log(data)
        }, error => {
          console.log('Unable to delete data: ')
          console.log(error)
        });    
    } else {
      this.likeProvider.addLike(like)
      .subscribe(data => {
        console.log(data)
      }, error => {
        console.log('Unable to post data: ')
        console.log(error)
      });  
    }
  }

  goToOfertaPage(id : number) {
    this.navCtrl.push(OfertaPage, { id: id });
  }

  goToFeiraPage(id : number) {
    this.navCtrl.push(FeiraPage, { id: id });
  } 

  ionViewDidLoad() {
    if(this.platform.is('cordova')) {
      this.platform.ready().then(()=>{
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      })
    }
  }

  getItems(ev: any) {
    this.items = this.items_backup;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.produto_nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
