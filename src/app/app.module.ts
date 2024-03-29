import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ProfilePage } from '../pages/profile/profile';
import { FeiraPage } from '../pages/feira/feira';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OfertaPage } from '../pages/oferta/oferta';
import { ProdutorPage } from '../pages/produtor/produtor';
import { PropriedadePage } from '../pages/propriedade/propriedade';
import { QRPage } from '../pages/qr/qr';
import { TabsPage } from '../pages/tabs/tabs';
import { FeirasPage } from '../pages/feiras/feiras';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Geolocation } from '@ionic-native/geolocation';

import { GoogleMaps } from '@ionic-native/google-maps';
import { ProdutorProvider } from '../providers/produtor/produtor.provider';
import { PropriedadeProvider } from '../providers/propriedade/propriedade.provider';
import { FeiraProvider } from '../providers/feira/feira.provider';
import { OfertaProvider } from '../providers/oferta/oferta.provider';
import { LikeProvider } from '../providers/like/like.provider';
import { AuthProvider } from '../providers/auth/auth.provider';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from './constants';
import { GooglePlus } from '@ionic-native/google-plus';
import {IonicStorageModule} from "@ionic/storage";
import { SessionProvider } from '../providers/session/session';

@NgModule({
  declarations: [
    MyApp,
    QRPage,
    ProfilePage,
    HomePage,
    TabsPage,
    FeiraPage,
    OfertaPage,
    ProdutorPage,
    PropriedadePage,
    LoginPage,
    FeirasPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QRPage,
    ProfilePage,
    HomePage,
    TabsPage,
    FeiraPage,
    OfertaPage,
    ProdutorPage,
    PropriedadePage,
    LoginPage,
    FeirasPage
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
    AngularFireAuth,
    GooglePlus,
    AuthProvider,
    SessionProvider,
    Geolocation
  ]
})
export class AppModule {}
