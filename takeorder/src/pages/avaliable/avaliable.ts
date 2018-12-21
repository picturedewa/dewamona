import { Component,Input } from '@angular/core';
import { NavController,ModalController,App,AlertController,LoadingController } from 'ionic-angular';
import { PopavaliablePage } from '../popavaliable/popavaliable';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { ServiceAlb } from '../../service/servicealb';
import { Datameja } from '../../class/datameja';


@Component({
  selector: 'page-avaliable',
  templateUrl: 'avaliable.html',
})
export class AvaliablePage {
  @Input() events: any;
  @Input() data: any;
  datameja:any;
  datatemp : Datameja[]=[];
  curruser:any;
  namauser:any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,
    private apps:App,private alertCtrl: AlertController,private loadingCtrl:LoadingController,
    public afAuth: AngularFireAuth,private storage: Storage,private servicealb:ServiceAlb) {
      //this.doRefresh(0);
      
  }

  doRefresh(refresher){
    if(this.namauser=="Banded"){
      this.alertHandler('Error','Please Log out and Login Again');
    }else{
        this.loaddatameja();
        if(refresher !=0)
        refresher.complete();
    }
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad AvaliablePage');
    this.storage.get("namauser").then((datadevice) => {
      if (datadevice!=null){
          this.namauser=datadevice.toLocaleUpperCase();
      }else{
        this.namauser="Banded";
        this.alertHandler('Error','Please Log out and Login Again');
      }
  });
  }
  onCallbackEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]();
      
    }
  }

  openModalBasic(data){
    let modal = this.modalCtrl.create(PopavaliablePage,data);
    modal.onDidDismiss(() => {
      //console.log('back from PopavaliablePage');
      this.loaddatameja();
    });
 		modal.present();
  }

  keluar(){
    this.storage.clear();
    this.afAuth.auth.signOut();
    //this.navCtrl.setRoot(LoginPage);
    this.apps.getRootNav().setRoot(LoginPage);
    
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.loaddatameja();
  }

  loaddatameja(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.cekmeja().subscribe(output=>{
      //this.datameja=output;
      this.datatemp=output['data'];
     //console.log(this.datameja);
     loader.dismiss();
    }),error=>{
       loader.dismiss();
      this.alertHandler('Error',error);
    }
  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

}
