import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PrinterProvider } from './../providers/printer/printer';
import { commands } from './../providers/printer/printer-commands';
import{ Injectable } from "@angular/core";

@Injectable()
export class Printeblu {
  inputData:any = {};
  constructor(private printer: PrinterProvider, private alertCtrl: AlertController, 
    private loadCtrl: LoadingController, private toastCtrl: ToastController) {

    }
    showToast(data) { 
        let toast = this.toastCtrl.create({
        duration: 3000,
        message: data,
        position: 'bottom'
        });
        toast.present();
    }
    // semua module print
    noSpecialChars(string) {
        var translate = {
            "à": "a","á": "a","â": "a","ã": "a","ä": "a","å": "a","æ": "a",
            "ç": "c","è": "e","é": "e","ê": "e","ë": "e","ì": "i","í": "i",
            "î": "i","ï": "i","ð": "d","ñ": "n","ò": "o","ó": "o","ô": "o",
            "õ": "o","ö": "o","ø": "o","ù": "u","ú": "u","û": "u","ü": "u",
            "ý": "y","þ": "b","ÿ": "y","ŕ": "r","À": "A","Á": "A","Â": "A",
            "Ã": "A","Ä": "A","Å": "A","Æ": "A","Ç": "C","È": "E","É": "E",
            "Ê": "E","Ë": "E","Ì": "I","Í": "I","Î": "I","Ï": "I","Ð": "D",
            "Ñ": "N","Ò": "O","Ó": "O","Ô": "O","Õ": "O","Ö": "O","Ø": "O",
            "Ù": "U","Ú": "U","Û": "U","Ü": "U","Ý": "Y","Þ": "B","Ÿ": "Y",
            "Ŕ": "R"
        },
        translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
        return (string.replace(translate_re, function (match) {
        return translate[match];
        }));
    }

    print(device, data) {
        // console.log('Device mac: ', device);
        // console.log('Data: ', data);
        let load = this.loadCtrl.create({
          content: 'Printing...'
        }); 
        load.present();
        this.printer.connectBluetooth(device).subscribe(status => {
            //console.log(status);
            this.printer.printData(this.noSpecialChars(data))
              .then(printStatus => {
                //console.log(printStatus);
                let alert = this.alertCtrl.create({
                  title: 'Successful print!',
                  buttons: ['Ok'] 
                });
                
                load.dismiss();
                alert.present();
                // return "true";
                 this.printer.disconnectBluetooth();
              })
              .catch(error => {
                //console.log(error);
                let alert = this.alertCtrl.create({
                  title: 'There was an error printing, please try again!',
                  buttons: ['Ok']
                });
                
                load.dismiss();
                alert.present();
                // return "false";
                 this.printer.disconnectBluetooth();
              });
          },
          error => {
            //console.log(error);
            let alert = this.alertCtrl.create({
              title: 'There was an error connecting to the printer, please try again!',
              buttons: ['Ok']
            });
            
            load.dismiss();
            alert.present();
            // return "false";
          });
      }
    
      prepareToPrint(device,data) {
        // u can remove this when generate the receipt using another method
        let printbody= data.nama + "   " + data.qty + " " + data.unit;
      let receipt = '';
      receipt += commands.HARDWARE.HW_INIT;
      receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
      receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
      receipt += data.meja.toUpperCase();
      receipt += commands.EOL;
      receipt += commands.TEXT_FORMAT.TXT_NORMAL;
      receipt += commands.HORIZONTAL_LINE.HR_58MM; // garis ==
      receipt += commands.EOL; // baris baru
      // receipt += commands.HORIZONTAL_LINE.HR2_58MM; // garis *
      // receipt += commands.EOL; //baris baru
      receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
      receipt += printbody;
      //secure space on footer
      receipt += commands.EOL;
      receipt += commands.EOL;
      receipt += commands.EOL;
        this.print(device, receipt);
        

      }

}
