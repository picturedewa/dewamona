import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { ServiceAlb } from '../../service/servicealb';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-popavaliable',
  templateUrl: 'popavaliable.html',
})
export class PopavaliablePage {
  @Input() events: any;
  @Input() data: any;
  namatamu:any;
  jlmtamu:any;
  hasilapi:any;
  namameja:any;
  userid:any;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams
    ,public afAuth: AngularFireAuth,private servicealb:ServiceAlb,private alertCtrl: AlertController) {
        this.namameja = this.navParams.get("nama") as string;
        this.userid=this.afAuth.auth.currentUser.uid;
  
      // this.userid = this.storage.get('iduser');
  }

  onCallbackEvent = (event: string): void => {
    if (this.events[event]) {
      this.events[event]();
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopavaliablePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  onsaveopentable(){
    let Datauser={"namameja":this.namameja,
                  "namatamu":this.namatamu,
                  "user_id":this.userid,
                  "jlmtamu":this.jlmtamu};
    // console.log(Datauser);
    this.servicealb.opentabletamu(Datauser).subscribe(output=>{
       this.hasilapi=output;
    //  console.log("ini nilai success",this.hasilapi.success);
      if (this.hasilapi == true){
        // this.hasilapi=output['data'];
        // this.alertHandler('Success','Table Is Open')
        let confirm = this.alertCtrl.create({
          title: 'Success',
          message: 'Table Is Open',
          buttons: [
          {
            text: 'OK',
            handler: () => {
              this.dismiss();
            }
          }]
        });
        confirm.present();

      }else{
        this.alertHandler('Error',this.hasilapi['message'])
      }
      
    }),error=>{
      // loader.dismiss();
      // this.dataitme=error;
      //console.log(this.dataitme);
      this.alertHandler('Error',this.hasilapi['message']);

    }
  }
  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }
}
