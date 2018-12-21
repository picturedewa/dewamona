import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServiceAlb } from '../service/servicealb';
import { HttpModule } from '@angular/http';
import { PrinterProvider } from './../providers/printer/printer';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'; //$ ionic cordova plugin add cordova-plugin-bluetooth-serial
                                                                  //$ npm install --save @ionic-native/bluetooth-serial
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';  //$ npm install firebase angularfire2 --save
import { IonicStorageModule } from '@ionic/storage';  //ionic cordova plugin add cordova-sqlite-storage
import { BarPage } from '../pages/bar/bar';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { Printeblu } from '../service/printeblu';
import { ForgetpasPage } from '../pages/forgetpas/forgetpas';
                                                      //npm install --save @ionic/storage

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
    BarPage,
    LoginPage,
    RegisterPage,
    ForgetpasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BarPage,
    LoginPage,
    RegisterPage,
    ForgetpasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PrinterProvider,BluetoothSerial,ServiceAlb,Printeblu,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
