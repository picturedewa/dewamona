import { Component } from '@angular/core';
import { NavController,App,NavParams,ViewController,AlertController,LoadingController } from 'ionic-angular';
import { PopopenedPage } from '../popopened/popopened';
import { ServiceAlb } from '../../service/servicealb';
import { AngularFireAuth } from 'angularfire2/auth';
import { Dataord } from '../../class/dataord';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-opened',
  templateUrl: 'opened.html',
})
export class OpenedPage {
  hasilapi:any;
  datatemp : Dataord[]=[];
  namauser:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams
    ,private servicealb:ServiceAlb,private alertCtrl: AlertController,private apps:App,private storage: Storage,
    private loadingCtrl:LoadingController,public afAuth: AngularFireAuth) {
      //this.doRefresh(0);

  }
  
  doRefresh(refresher){
    this.loadsemuaorder();
    if(refresher !=0)
    refresher.complete();
  }

  openModalBasic(dataitem){
    this.navCtrl.push(PopopenedPage,dataitem);
    
  }
  ionViewWillEnter(){
  
    this.loadsemuaorder();
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
  loadsemuaorder(){
    
    let Datauser={"userid":this.afAuth.auth.currentUser.uid};
   // console.log("ini datauser",Datauser);
    let loader = this.loadingCtrl.create({content:'Please wait..'});
      loader.present();
    this.servicealb.listordtable(Datauser).subscribe(output=>{
      this.hasilapi=output;
      this.datatemp=output;
      loader.dismiss();
   }),error=>{
      loader.dismiss();
     this.alertHandler('Error',this.hasilapi['message']);

   }
  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

}
