import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,
        AlertController,ModalController } from 'ionic-angular';
import { ServiceAlb } from '../../service/servicealb';
import { AddwaitersPage } from '../addwaiters/addwaiters';
@IonicPage()
@Component({
  selector: 'page-waiters',
  templateUrl: 'waiters.html',
})
export class WaitersPage {
  datameja:any;
  noorder:any;
  datawaiters:any;
  datatemp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    private loadingCtrl:LoadingController, private servicealb:ServiceAlb,public modalCtrl: ModalController) {
      
    this.datameja=this.navParams.get('data');
    this.noorder=this.navParams.get('noorder');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitersPage');
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.datameja=this.navParams.get('data');
    this.noorder=this.navParams.get('noorder');
    this.loaddatawaiters();
    
  }

  loaddatawaiters(){
    let dataorder={"noord":this.noorder};
    console.log(this.noorder);
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.loadexitwaiters(dataorder).subscribe(output=>{
      //this.datameja=output;
      this.datawaiters=output['data'];
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

  onfabclick(){
   // console.log('modal addwaiters',this.noorder);
    let modal = this.modalCtrl.create(AddwaitersPage,{noord: this.noorder});
    modal.onDidDismiss(() => {
      //console.log('back from waiters page');
      this.loaddatawaiters();
    });
 		modal.present();
    
  }
  delwaiters(kodedata)
  {
     console.log(kodedata);
    let dataorder={"noord":kodedata.idord,
                    "idwaiters":kodedata.idwaiters
              };
    
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.delwaiters(dataorder).subscribe(output=>{
      console.log(output['data']);
      if(output['data']){
        this.loaddatawaiters();
      }
     loader.dismiss();
    }),error=>{
       loader.dismiss();
       this.alertHandler('Error','Please Try Again');
    }
  }
}
