import { Component } from '@angular/core';
import { IonicPage,NavController,App,AlertController,LoadingController,NavParams } from 'ionic-angular';
import { ServiceAlb } from '../../service/servicealb';
import { AngularFireAuth } from 'angularfire2/auth';
import { PrinterProvider } from './../../providers/printer/printer';
import { commands } from './../../providers/printer/printer-commands';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { Printeblu } from '../../service/printeblu'

@IonicPage()
@Component({
  selector: 'page-bar',
  templateUrl: 'bar.html',
})
export class BarPage {
  devicestr:any;
  databartenders:any;
  namauser:any;
    constructor(public navCtrl: NavController,public alertCtrl: AlertController,private servicealb:ServiceAlb,
    public navParams: NavParams,private loadingCtrl:LoadingController,private printer: PrinterProvider,
    private storage: Storage,public afAuth: AngularFireAuth,private apps:App,private printeblu:Printeblu) {
      this.doRefresh(0);
  }

  keluar(){
    this.storage.clear();
    this.afAuth.auth.signOut();
    //this.navCtrl.setRoot(LoginPage);
    this.apps.getRootNav().setRoot(LoginPage);
    
  }
  doRefresh(refresher){
    if(this.namauser=="Banded"){
      this.alertHandler('Error','Please Log out and Login Again');
    }else{
      this.loaddataweb();
      if(refresher !=0)
      refresher.complete();
    }
    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarPage');
    this.storage.get("namauser").then((datadevice) => {
      if (datadevice!=null){
          this.namauser=datadevice.toLocaleUpperCase();
      }else{
        this.namauser="Banded";
        this.alertHandler('Error','Please Log out and Login Again');
      }
  });
    
  }

  loaddataweb(){
    let loader = this.loadingCtrl.create({content:'Please wait..'});
    loader.present();
    this.servicealb.loaddatabartender().subscribe(output=>{
      loader.dismiss();
      this.databartenders=output;

    }),error=>{
      loader.dismiss();
      this.databartenders=null;
     
    }
  }

  printalldata(datameja){
    //konek ke db ambil semua item di meja itu yg blm di kirim
    let confirm = this.alertCtrl.create({
      title: 'Close All Order',
      message: 'Ready Delivered ?',
      buttons: [
      {
        text: 'YES',
        handler: () => {
          let loader = this.loadingCtrl.create({content:'Please wait..'});
          loader.present();
          this.storage.get("device").then((datadevice) => {
            if(datadevice == null){
              loader.dismiss();
              this.setprinter();
            }else{
              let datastring={"idord":this.databartenders[datameja].idord}
              console.log(datastring);
                    // prnt 
                  let receipt = '';
                  receipt += commands.HARDWARE.HW_INIT;
                  receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
                  receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
                  receipt += this.databartenders[datameja].meja.toUpperCase();
                  receipt += commands.EOL;
                  receipt += commands.TEXT_FORMAT.TXT_NORMAL;
                  receipt += commands.HORIZONTAL_LINE.HR_58MM; // garis ==
                  receipt += commands.EOL;
                  receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
                  for(let dataordmeja of this.databartenders[datameja].order){
                    receipt += dataordmeja.namapro + "   " + parseInt(dataordmeja.qty) + " " + dataordmeja.unit
                    receipt += commands.EOL;
                  }
                  
                  receipt += commands.EOL;
                  receipt += commands.EOL;
                  receipt += commands.EOL;
                  this.printeblu.print(datadevice,receipt);
                  this.servicealb.updatestsordall(datastring).subscribe(hasil=>{
                      if(hasil==true){
                          this.databartenders.splice(datameja -1, 1); //(startindex, jlm index yg didel dari start)
                          loader.dismiss();
                      }else{
                        loader.dismiss();
                        this.alertHandler('Error','Please Try Again');
                       
                      }
                      }),error=>{
                        loader.dismiss();
                      }
            }
          }),error=>{
            loader.dismiss();
            this.setprinter();
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

  onprompt(datameja,dataproduct){
    // console.log(datameja,dataproduct);
    let confirm = this.alertCtrl.create({
      title: 'Close Order',
      message: 'Ready Delivered ?',
      buttons: [
      {
        text: 'YES',
        handler: () => {

          let loader = this.loadingCtrl.create({content:'Please wait..'});
          loader.present();
          this.storage.get("device").then((datadevice) => {
            if(datadevice == null){
              loader.dismiss();
              this.setprinter();
            }else{
              let dataorder={"proid":this.databartenders[datameja].order[dataproduct].proid,
              "idord":this.databartenders[datameja].idord,
              "idrow":this.databartenders[datameja].order[dataproduct].id,
              };
              let dataprinttemp={"meja":this.databartenders[datameja].meja,
                      "nama":this.databartenders[datameja].order[dataproduct].namapro,
                      "qty":this.databartenders[datameja].order[dataproduct].qty,
                      "unit":this.databartenders[datameja].order[dataproduct].unit
              };
              
                    // this.printeblu.prepareToPrint(datadevice,dataprinttemp);

                    let receipt = '';
                  receipt += commands.HARDWARE.HW_INIT;
                  receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
                  receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
                  receipt += this.databartenders[datameja].meja.toUpperCase();
                  receipt += commands.EOL;
                  receipt += commands.TEXT_FORMAT.TXT_NORMAL;
                  receipt += commands.HORIZONTAL_LINE.HR_58MM; // garis ==
                  receipt += commands.EOL;
                  receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
                    receipt += this.databartenders[datameja].order[dataproduct].namapro + "   " + this.databartenders[datameja].order[dataproduct].qty + " " + this.databartenders[datameja].order[dataproduct].unit;
                  receipt += commands.EOL;
                  receipt += commands.EOL;
                  receipt += commands.EOL;
                  this.printeblu.print(datadevice,receipt);
                    this.servicealb.updatestsord(dataorder).subscribe(hasil=>{
                      if(hasil==true){
                        this.databartenders[datameja].order.splice(dataproduct, 1);
                        loader.dismiss();
                      }else{
                        loader.dismiss();
                        this.alertHandler('Error','Please Try Again');
                        
                      }
                    }),error=>{
                      loader.dismiss();
                    }
            }
          }),error=>{
            loader.dismiss();
            this.setprinter();
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


  alertHandler(title,message){
    const alert=this.alertCtrl.create({title:title,message:message,buttons: ['ok']});
    alert.present();
  }

  setprinter(){
    let alert = this.alertCtrl.create({
      title: 'Select your printer',
      buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Select printer',
          handler: (device) => {
            if(!device){
              this.alertHandler("Printer","Select a printer!");
              return false;
            }
            console.log(device);
            this.storage.set("device",device);
            this.devicestr=device;
          }
        }
      ]
    });

    this.printer.enableBluetooth().then(() => {
      this.printer.searchBluetooth().then(devices => {
        devices.forEach((device) => {
          console.log('Devices: ', JSON.stringify(device));
          alert.addInput({
            name: 'printer',
            value: device.address,
            label: device.name,
            type: 'radio'
          });
        });
        alert.present();
      }).catch((error) => {
        console.log(error);
        this.alertHandler("There was an error connecting the printer", "please try again!");
      });
    }).catch((error) => {
      console.log(error);
      this.alertHandler("Error activating bluetooth", "please try again!");
    });
  }
}
