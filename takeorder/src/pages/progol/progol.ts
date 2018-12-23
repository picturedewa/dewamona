import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ServiceAlb } from '../../service/servicealb';
import { Dataproduct } from '../../class/dataproduct';
import { MenulistPage } from '../menulist/menulist';
@IonicPage()
@Component({
  selector: 'page-progol',
  templateUrl: 'progol.html',
})
export class ProgolPage {
  datameja:any;
  noorder:any;
  namauser:any;
  datatemp :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    public afAuth: AngularFireAuth,private apps:App,private loadingCtrl:LoadingController,private servicealb:ServiceAlb
    ,public alertCtrl: AlertController,) {

    // this.datameja=this.navParams.get('data');
    // this.noorder=this.navParams.get('noorder');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgolPage');
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.loaddataproduct();
    // this.datameja=this.navParams.get('data');
    // this.noorder=this.navParams.get('noorder');
    this.storage.get("namauser").then((datadevice) => {
      if (datadevice!=null){
          this.namauser=datadevice.toLocaleUpperCase();
      }else{
        this.namauser="Banded";
      }
  });
  }

  keluar(){
    this.storage.clear();
    this.afAuth.auth.signOut();
    //this.navCtrl.setRoot(LoginPage);
    this.apps.getRootNav().setRoot(LoginPage);
    
  }

  loaddataproduct(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.listgol().subscribe(output=>{
      //this.datameja=output;
      this.datatemp=output['data'];
     //console.log(this.datameja);
     loader.dismiss();
    }),error=>{
       loader.dismiss();
       this.alertHandler('Error','Please Try Again');
   
    }
  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

  loaddatapro(iddata){
      // console.log(iddata);
      this.navCtrl.push(MenulistPage,{data:iddata});
  }

}
