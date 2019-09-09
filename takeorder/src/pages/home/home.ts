import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { Storage } from '@ionic/storage';
import { ServiceAlb } from '../../service/servicealb';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  hasildb:any;
  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth,private alertCtrl: AlertController,
    public storage: Storage,private servicealb:ServiceAlb) {
      
      
      this.loaddata();

  }

  private loaddata(){
    setTimeout(() => {
      //  this.stsuser= this.storage.get('stsaktif');

      if(this.afAuth.auth.currentUser != null){
        let data={"user_id":this.afAuth.auth.currentUser.uid};
        this.servicealb.cekstsusr(data).subscribe(output=>{
          this.hasildb=output;
         // console.log(this.dataitem);
          if (this.hasildb['status']=='200'){
            this.storage.set('stsaktif',1);
            this.navCtrl.setRoot(TabsPage);
            
          }else{
            
            this.storage.set('stsaktif',0);
            this.navCtrl.setRoot(LoginPage);

          }
          
        }),error=>{
          
          this.hasildb=error;
          //console.log(this.dataitme);
          this.alertHandler('Error',this.hasildb['message']);
          this.storage.set('stsaktif',0);
          this.navCtrl.setRoot(LoginPage);
          
        }
        
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    },3000);
  }
  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }
}
