import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { QRPage } from '../pages/qr/qr';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProdutorPage } from '../pages/produtor/produtor';
import { PropriedadePage } from '../pages/propriedade/propriedade';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { GoogleMaps } from '@ionic-native/google-maps';
import { ProdutorProvider } from '../providers/produtor/produtor';
import { PropriedadeProvider } from '../providers/propriedade/propriedade';

@NgModule({
  declarations: [
    MyApp,
    QRPage,
    ContactPage,
    HomePage,
    TabsPage,
    ProdutorPage,
    PropriedadePage
  ],
  imports: [
    BrowserModule,
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
  ]
})
export class AppModule {}
