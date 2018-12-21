import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { ServiceAlb } from '../../service/servicealb';
import { BarPage } from '../bar/bar';
import { ForgetpasPage } from '../forgetpas/forgetpas';
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
    
  }
  onForgot(){
    this.navCtrl.push(ForgetpasPage);
  }
  onLogin(){
    //this.navCtrl.setRoot(TabsPage);
    this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password)
          .then(data=>{
            let loader = this.loadingCtrl.create({content:'Please wait..'});
            loader.present();
            setTimeout(() => {
              let user=this.afAuth.auth.currentUser;
              if(user.emailVerified){
                // cek sudah aktif atau belum
                let data={"user_id":this.afAuth.auth.currentUser.uid};
                console.log(data);
                
                this.servicealb.cekstsusr(data).subscribe(output=>{
                  this.hasildb=output;
                  this.datauser=output['data'];
                  if (this.hasildb['status']=='200'){
                    loader.dismiss();
                    console.log(this.datauser[0].nama)
                    this.storage.set('stsaktif',1);
                    this.storage.set('namauser',this.datauser[0].nama);
                    this.navCtrl.setRoot(BarPage);
                  }else{
                    loader.dismiss();
                    this.storage.set('stsaktif',0);
                    this.alertHandler("Approved","Your Account has not been approved")
                  }
                  
                }),error=>{
                  loader.dismiss();
                  this.alertHandler('Error',this.hasildb['message']);
                  this.alertHandler('Error','Please Check Your Connection');
                  
                }
  
                
              }else{
                this.alertHandler("Verified","We Send You Email , Please Verified your email")
              }

            },3000);
              
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
