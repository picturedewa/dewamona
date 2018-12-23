import { Component } from '@angular/core';
import { IonicPage, NavController,App, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Dataproduct } from '../../class/dataproduct';
import { AngularFireAuth } from 'angularfire2/auth';
import { ServiceAlb } from '../../service/servicealb';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-menulist',
  templateUrl: 'menulist.html',
})
export class MenulistPage {
  datameja:any;
  noorder:any;
  idgol:any;
  datatemp : Dataproduct[]=[];
  namauser:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    private loadingCtrl:LoadingController,private apps:App,private storage: Storage,
     public afAuth: AngularFireAuth,private servicealb:ServiceAlb) {
      //this.doRefresh(0);
       
  }
  doRefresh(refresher){
    this.loaddataproduct();
    if(refresher !=0)
    refresher.complete();
  
  }
  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.idgol=this.navParams.get('data');
    this.loaddataproduct();
    // this.datameja=this.navParams.get('data');
    // this.noorder=this.navParams.get('noorder');
    // console.log(this.idgol);
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
    // console.log(this.idgol);
    let datagol={"gol":this.idgol};
    this.servicealb.loadproduct(datagol).subscribe(output=>{
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
}
