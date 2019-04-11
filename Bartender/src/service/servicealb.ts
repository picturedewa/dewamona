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
    //cek status user aktif / ngak 
    newregis(data){
        return this.http.post(this.url+'register',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }
    // cek login user
    cekstsusr(data){
        // alert(data);
        return this.http.post(this.url+'loginbartender',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);

    }

    //load list order bartender
    loaddatabartender(){
        return this.http.post(this.url+'orderdetailbar',{},this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    ordermejadetail(data){
        return this.http.post(this.url+'loadisimeja',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }
    //update ordersts 
    updatestsord(data){
        return this.http.post(this.url+'updatestock',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    updatestsordall(data){
        return this.http.post(this.url+'updatestockall',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    loadisimeja(data){
        return this.http.post(this.url+'loadisimeja',JSON.stringify(data),this.options)
        .map(res=>res.json())
        .catch(this.handleError);
    }

    handleError(error){

        console.log(error);
            return Observable.throw(error.json().error);
    }
}
