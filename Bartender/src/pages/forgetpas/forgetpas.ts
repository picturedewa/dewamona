import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgetpasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgetpas',
  templateUrl: 'forgetpas.html',
})
export class ForgetpasPage {
  logo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.logo="assets/imgs/logo.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasPage');
  }

}
