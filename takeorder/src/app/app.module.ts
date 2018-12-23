import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServiceAlb } from '../service/servicealb';
import { HttpModule } from '@angular/http';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'; //$ ionic cordova plugin add cordova-plugin-bluetooth-serial
                                                                  //$ npm install --save @ionic-native/bluetooth-serial
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';  //$ npm install firebase angularfire2 --save
import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AvaliablePage } from '../pages/avaliable/avaliable';
import { PopavaliablePage } from '../pages/popavaliable/popavaliable';
import { PopopenedPage } from '../pages/popopened/popopened';
import { NeworderPage } from '../pages/neworder/neworder';
import { OpenedPage } from '../pages/opened/opened';
import { WaitersPage } from '../pages/waiters/waiters';
import { AddwaitersPage } from '../pages/addwaiters/addwaiters';
import { TabsPage } from '../pages/tabs/tabs';
import { PindahPage } from '../pages/pindah/pindah';
import { MenulistPage } from '../pages/menulist/menulist';
import { ProgolPage } from '../pages/progol/progol';
import { ProgolorderPage } from '../pages/progolorder/progolorder';

const config = {
  apiKey: "AIzaSyAQGsNJTpapJCsiIlrkfu3WELMpsVgn49I",
  authDomain: "monalisa-78cf2.firebaseapp.com",
  databaseURL: "https://monalisa-78cf2.firebaseio.com",
  projectId: "monalisa-78cf2",
  storageBucket: "monalisa-78cf2.appspot.com",
  messagingSenderId: "542731107094"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AvaliablePage,
    PopavaliablePage,
    PopopenedPage,
    NeworderPage,
    OpenedPage,
    WaitersPage,
    AddwaitersPage,
    TabsPage,
    PindahPage,
    MenulistPage,
    ProgolPage,
    ProgolorderPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
    }),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    AvaliablePage,
    PopavaliablePage,
    PopopenedPage,
    NeworderPage,
    OpenedPage,
    WaitersPage,
    AddwaitersPage,
    TabsPage,
    PindahPage,
    MenulistPage,
    ProgolPage,
    ProgolorderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,ServiceAlb,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
