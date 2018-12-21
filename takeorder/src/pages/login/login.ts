import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { ServiceAlb } from '../../service/servicealb';
import { Datauser } from '../../class/datauser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  logo:string;
  hasildb:any;
  datauser:Datauser[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private servicealb:ServiceAlb,
    public afAuth: AngularFireAuth,private storage: Storage,private loadingCtrl:LoadingController
    ,private alertCtrl: AlertController) {
    this.logo="assets/imgs/logo.png";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  onLogin(){
    //this.navCtrl.setRoot(TabsPage);
    this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password)
          .then(data=>{
            let loader = this.loadingCtrl.create({content:'Please wait..'});
            loader.present();
            let user=this.afAuth.auth.currentUser;
            if(user.emailVerified){
              
              let data={"user_id":user.uid};
              this.servicealb.cekstsusr(data).subscribe(output=>{
                this.hasildb=output;
              this.datauser=output['data'];
                loader.dismiss();
               // console.log(this.dataitem);
                if (this.hasildb['status']=='200'){
                  //console.log(this.datauser[0].nama);
                  this.storage.set('stsaktif',1);
                  this.storage.set('namauser',this.datauser[0].nama);
                  this.navCtrl.setRoot(TabsPage);
                }else{
                  
                  this.storage.set('stsaktif',0);
                  this.alertHandler("Approved","Your Account has not been approved")
                }
                
              }),error=>{
                loader.dismiss();
                this.alertHandler('Error','Please Check Your Connection');
      
              }

              
            }else{
              loader.dismiss();
              this.alertHandler("Verified","We Send You Email , Please Verified your email")
            }
              
          })
          .catch(error=>{
            
            this.alertHandler("Error","Please Check Your Connection");
          })

    
  }
  onRegister(){
    this.navCtrl.push(RegisterPage);
  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

}
