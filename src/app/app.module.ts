import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { QRPage } from '../pages/qr/qr';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FeiraPage } from '../pages/feira/feira';
import { OfertaPage } from '../pages/oferta/oferta';
import { ProdutorPage } from '../pages/produtor/produtor';
import { PropriedadePage } from '../pages/propriedade/propriedade';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { GoogleMaps } from '@ionic-native/google-maps';
import { ProdutorProvider } from '../providers/produtor/produtor.provider';
import { PropriedadeProvider } from '../providers/propriedade/propriedade.provider';
import { FeiraProvider } from '../providers/feira/feira.provider';
import { OfertaProvider } from '../providers/oferta/oferta.provider';
import { LikeProvider } from '../providers/like/like.provider';

@NgModule({
  declarations: [
    MyApp,
    QRPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeiraPage,
    OfertaPage,
    ProdutorPage,
    PropriedadePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QRPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeiraPage,
    OfertaPage,
    ProdutorPage,
    PropriedadePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutorProvider,
    PropriedadeProvider,
    GoogleMaps,
    ScreenOrientation,
    FeiraProvider,
    OfertaProvider,
    LikeProvider,
  ]
})
export class AppModule {}
