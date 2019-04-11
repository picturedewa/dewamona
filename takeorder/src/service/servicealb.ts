import{ Injectable } from "@angular/core";
import{ Headers, Http, RequestOptions } from '@angular/http'
import { AlertController} from 'ionic-angular';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServiceAlb{
    data: Observable<any>;
    
     url: string='your_api';
    headers:any;
    options:any;

    constructor(private http:Http,private alertCtrl:AlertController){
        
        this.headers= new Headers({
             'Content-Type':'application/json',
             'Cache-Control': 'no-cache',
             'X-API-KEY':'12345',
        });
        
        this.options=new RequestOptions ({headers:this.headers});

    }
     // cek login user
     cekstsusr(data){
        return this.http.post(this.url+'ceklogin',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    newregis(data){
        return this.http.post(this.url+'register',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    // load meja
    cekmeja(){
        return this.http.post(this.url+'loadmeja',{},this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    //oepntable
    opentabletamu(data){
        return this.http.post(this.url+'bukameja',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    //listordertable
    listordtable(data){
        return this.http.post(this.url+'listmejaord',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    //listprodorder
    listprodord(data){
        return this.http.post(this.url+'listproductorder',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    //pindahmeja
    pindahmeja(data){
        return this.http.post(this.url+'pindahmeja',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

     // load closebill
     closebill(data){
        return this.http.post(this.url+'closebill',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

     //loadproduct
     loadproduct(data){
        //  console.log(data);
        return this.http.post(this.url+'loadproduct',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    // save order detail
    saveorderdetail(data){
        return this.http.post(this.url+'saveorderdetail',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    // load waiters
    loadexitwaiters(data){
        return this.http.post(this.url+'loadwaiterexiting',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    // load waiters
    delwaiters(data){
        return this.http.post(this.url+'delwaiters',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    // load waiters
    loadavaliablewaiters(){
        return this.http.post(this.url+'loadavaliablewaiters',{},this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

     // load waiters
     addwaiters(data){
        return this.http.post(this.url+'addwaiters',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    cekordbartender(idord){
        return this.http.post(this.url+'delitemord',JSON.stringify(idord),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    listgol(){
        return this.http.post(this.url+'listgol',{},this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    handleError(error){

        console.log(error);
            return Observable.throw(error.json().error);
    }
}
