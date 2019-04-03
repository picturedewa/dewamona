import { Component,Input } from '@angular/core';
import { IonicPage, NavParams,ModalController, ViewController,AlertController,LoadingController } from 'ionic-angular';
import { ServiceAlb } from '../../service/servicealb';
/**
 * Generated class for the AddwaitersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addwaiters',
  templateUrl: 'addwaiters.html',
})
export class AddwaitersPage {
  @Input() events: any;
  @Input() data: any;
  datawaiters:any;
  noorder:any;
  constructor(public modalCtrl: ModalController,public viewCtrl: ViewController,public alertCtrl: AlertController,
    private loadingCtrl:LoadingController, private servicealb:ServiceAlb,public params: NavParams) {

      this.noorder=this.params.get('noord');
      //console.log(this.noorder);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddwaitersPage',this.noorder);
   
  }
  onCallbackEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
   
    this.loaddatawaiters();
    
  }

  loaddatawaiters(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.loadavaliablewaiters().subscribe(output=>{
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

  savedatawaiters(kodewaiters){
    //console.log(kodewaiters);
    let dataorder={"noord":this.noorder,
                    "idwaiters":kodewaiters.id
              };
    //console.log(dataorder);
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.addwaiters(dataorder).subscribe(output=>{
      //console.log(output['data']);
      if(output['data']){
        this.dismiss();
      }
     loader.dismiss();
    }),error=>{
       loader.dismiss();
       this.alertHandler('Error','Please Try Again');
    }
  }
}
