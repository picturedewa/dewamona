import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { ServiceAlb } from '../../service/servicealb';
import { Datameja } from '../../class/datameja';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-pindah',
  templateUrl: 'pindah.html',
})
export class PindahPage {
  datameja:any;
  noorder:any;
  datatemp : Datameja[]=[];
  datapindah:any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public navParams: NavParams
    ,private loadingCtrl:LoadingController,private servicealb:ServiceAlb,public afAuth: AngularFireAuth) {
      this.datameja=this.navParams.get('data');
      this.noorder=this.navParams.get('noorder');
  }

  ionViewDidLoad() {
    
    this.datameja=this.navParams.get('data');

  }

  ionViewWillEnter(){
   
    this.loaddatameja();
  }

  loaddatameja(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
      loader.present();
    this.servicealb.cekmeja().subscribe(output=>{
      
      this.datatemp=output['data'];
     
     loader.dismiss();
    }),error=>{
       loader.dismiss();
      
    }
  }

  openModalBasic(datamejatujuan:string) { 
    let confirm = this.alertCtrl.create({
      title: 'Move Table',
      message: 'Are You Sure To Move?',
      buttons: [
      {
        text: 'Move',
        handler: () => {
          //console.log('Ok clicked');
          let dataorder={"noord":this.noorder,
                          "mejaawal":this.datameja,
                          "userid":this.afAuth.auth.currentUser.uid,
                          "mejatujuan" :datamejatujuan
              };
              // console.log("inidata",dataorder);
          let loader = this.loadingCtrl.create({content:'Please wait..'});
          loader.present();
          this.servicealb.pindahmeja(dataorder).subscribe(output=>{
            loader.dismiss();
           if(this.datapindah=output==true){
             this.loaddatameja();
           }else{
            this.alertHandler('Error','Please Try Again');
           }
            
          }),error=>{
            loader.dismiss();
            this.alertHandler('Error','Please Try Again');
          }

        }
      },
      {
        text: 'Cancel',
        handler: () => {
          //console.log('Cancel clicked');
          this.loaddatameja();
        }
      }
      ]
    });
    confirm.present();
  }
  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }
}
