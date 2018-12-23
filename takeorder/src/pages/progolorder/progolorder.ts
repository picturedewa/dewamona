import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
//import { AngularFireAuth } from 'angularfire2/auth';
import { ServiceAlb } from '../../service/servicealb';
import { NeworderPage } from '../neworder/neworder';


@IonicPage()
@Component({
  selector: 'page-progolorder',
  templateUrl: 'progolorder.html',
})
export class ProgolorderPage {
  datameja:any;
  noorder:any;
  namauser:any;
  datatemp :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl:LoadingController,private servicealb:ServiceAlb,public alertCtrl: AlertController) {
      this.datameja=this.navParams.get('data');
      this.noorder=this.navParams.get('noorder');
  }


  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.loaddataproduct();
    this.datameja=this.navParams.get('data');
    this.noorder=this.navParams.get('noorder');
    // console.log(this.datameja,this.noorder);
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
    //console.log(iddata);
    this.navCtrl.push(NeworderPage,{data:this.datameja,noorder:this.noorder,idgol:iddata});
}
}
