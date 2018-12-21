import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { ServiceAlb } from '../../service/servicealb';
import { Regis } from '../../class/regis';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  logo:string;
  username:any;
  password:any;

  register: Regis =new Regis();
  myForm:FormGroup;
  dataitme:any;
  constructor(public navCtrl: NavController,public afAuth: AngularFireAuth, private lodingCtrl:LoadingController,
    public navParams: NavParams,private alertCtrl: AlertController,private servicealb:ServiceAlb) {
      this.logo="assets/imgs/logo.png";
    this.myForm=new FormGroup({
      nama: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      alamat: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      tel: new FormControl('',Validators.required)
    });
  }

  ionViewDidLoad() {
    
  }
  onSkip(){
    this.navCtrl.push(LoginPage);
  }

  onSave(){
    
    this.afAuth.auth.createUserWithEmailAndPassword(this.username,this.password)
    .then(data=>{
      let user = this.afAuth.auth.currentUser;

      const value=this.myForm.value;
      this.register.nama=value.nama;
      this.register.alamat=value.alamat;
      this.register.iduser=user.uid;
      this.register.tel=value.tel;

        if(user.uid){
          user.sendEmailVerification();
          let loader=this.lodingCtrl.create({content:'Please wait...'});
          loader.present();

          this.servicealb.newregis(this.register).subscribe(output=>{
            loader.dismiss();
            this.dataitme=output;
            if (this.dataitme['status']=='200'){
              
              this.navCtrl.pop();
              this.alertHandler('Success',this.dataitme['message'])
            }else{
              this.alertHandler('Error',this.dataitme['message'])
            }
            
          }),error=>{
            loader.dismiss();
            this.dataitme=error;
            
            this.alertHandler('Error',this.dataitme['message']);
  
          }
        }else{
          this.alertHandler("Register","Error");
        }
    })
    .catch(error=>{
        
        this.alertHandler("Error",error);
    })

  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }
}
