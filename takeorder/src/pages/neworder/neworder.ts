import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Dataproduct } from '../../class/dataproduct';
import { AngularFireAuth } from 'angularfire2/auth';
import { ServiceAlb } from '../../service/servicealb';


@IonicPage()
@Component({
  selector: 'page-neworder',
  templateUrl: 'neworder.html',
})
export class NeworderPage {
  datameja:any;
  noorder:any;

  datatemp : Dataproduct[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
    private loadingCtrl:LoadingController, public afAuth: AngularFireAuth,private servicealb:ServiceAlb) {

    this.datameja=this.navParams.get('data');
    this.noorder=this.navParams.get('noorder');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NeworderPage');
  }

  ionViewWillEnter(){
    //console.log('ionViewWillEnter home');
    this.loaddataproduct();
    this.datameja=this.navParams.get('data');
    this.noorder=this.navParams.get('noorder');
  }
  
  loaddataproduct(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.loadproduct().subscribe(output=>{
      //this.datameja=output;
      this.datatemp=output['data'];
     //console.log(this.datameja);
     loader.dismiss();
    }),error=>{
       loader.dismiss();
       this.alertHandler('Error','Please Try Again');
   
    }
  }

  onprompt(kodepro){
    
    let prompt = this.alertCtrl.create({
      title: 'Qty',
      message: "Enter Qty Order",
      inputs: [
      {
        name: 'Qty',
        placeholder: 'Qty',
        type: 'number'
      },
      ],
      buttons: [
      {
        text: 'Cancel',
        handler: data => {
         
        }
      },
      {
        text: 'Save',
        handler: data => {
          
          //validate data
          let dataorder={"idord":this.noorder,
                          "qty":data.Qty,
                          "price":kodepro.price,
                          "total" :kodepro.price * data.Qty,
                          "proid" :kodepro.proid
              };
              console.log("inidata",dataorder);
              if (data.Qty!="" || data.Qty != 0){
                  let loader = this.loadingCtrl.create({content:'Please wait..'});
                  loader.present();
                  this.servicealb.saveorderdetail(dataorder).subscribe(output=>{
                    loader.dismiss();
                  if(output['data']==false){
                      this.alertHandler('Error','Please Try Again');
                  }
                    
                  }),error=>{
                    loader.dismiss();
                    this.alertHandler('Error','Please Try Again');
                  }
              }
              else{
                this.alertHandler('Error','Error Qty');
              }
          }
        }
      ]
    });
    prompt.present();
  }

  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }
}
