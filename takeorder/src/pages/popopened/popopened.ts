import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Dataord } from '../../class/dataord';
import { PindahPage } from '../pindah/pindah';
import { ServiceAlb } from '../../service/servicealb';
import { NeworderPage } from '../neworder/neworder';
import { WaitersPage } from '../waiters/waiters';

@IonicPage()
@Component({
  selector: 'page-popopened',
  templateUrl: 'popopened.html',
})
export class PopopenedPage {
  
  hasilapi:any;
  
  person: Dataord=new Dataord();
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,private servicealb:ServiceAlb,
     public navParams: NavParams,private loadingCtrl:LoadingController) {
      
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetailarticlePage')
    this.person=this.navParams.data;
  }
  ionViewWillEnter(){
   
    this.listproductorder();
   
  }

  movetable(){
    this.navCtrl.push(PindahPage,{data:this.person.meja,noorder:this.person.idord});
   
  }

  ordernew(){
    this.navCtrl.push(NeworderPage,{data:this.person.meja,noorder:this.person.idord});
  }

  addwaiters(){
    this.navCtrl.push(WaitersPage,{data:this.person.meja,noorder:this.person.idord});
  }
  

  listproductorder(){
    let dataorder={"noord":this.person.idord};
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.listprodord(dataorder).subscribe(output=>{
      console.log(output);
      this.hasilapi=output['data'];
    
      loader.dismiss();
   }),error=>{
      loader.dismiss();

     this.alertHandler('Error',this.hasilapi['message']);
   }
  }

  

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

  onclosebill(){
    let confirm = this.alertCtrl.create({
      title: 'Close Table',
      message: 'Are You Sure To Close?',
      buttons: [
      {
        text: 'YES',
        handler: () => {
          let dataorder={"noord":this.person.idord};
              let loader = this.loadingCtrl.create({content:'Please wait..'});
              loader.present();
              this.servicealb.closebill(dataorder).subscribe(output=>{
               
                this.hasilapi=output['data'];

                loader.dismiss();
            }),error=>{
                loader.dismiss();
              
              this.alertHandler('Error',this.hasilapi['message']);
            }
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    confirm.present();

  }

  removeItem(index,item){
    // console.log(item);
    // console.log("jumlahdata",this.hasilapi);
    //cek sudah di close bartender / belum 
    let data={"idord":item.id}
    this.servicealb.cekordbartender(data).subscribe(output=>{
        //console.log(output);
        if (!output.data){
          this.alertHandler("Close","Order Sudah diproses");
        }else{
          this.hasilapi.splice(index,1);
        }
    });
  }
}
