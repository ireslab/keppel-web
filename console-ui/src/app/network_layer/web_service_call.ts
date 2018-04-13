import { Injectable,NgModule } from '@angular/core';
import { IWebServiceCallback } from '../network_layer/IWebServiceCallback';
import { ApiConstants } from './api_constants';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'


@Injectable()
export class ServiceCall {

    constructor(private httpClient:HttpClient){}

    // static httpGetCall = function (url: any, reqJson: any): Observable<any> {
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //     headers.append('Access-Control-Allow-Methods', 'GET');
    //     headers.append('Access-Control-Allow-Origin', '*');
    //    return this.httpClient.get(url, reqJson,{ headers: headers}).map((response: Response) => <any>response.json())
    //     // return HttpClient.get(url, reqJson, { headers: "" }).map((responce: Response) => <any>responce.json())
    // }

    getPlans(url): Observable<any> {
        return this.httpClient.get(url, {responseType: 'json'});
     }
   
    //  newUserRegistration(url,reqJson){
    //     var headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Access-Control-Allow-Headers', 'Content-Type');
    //     headers.append('Access-Control-Allow-Methods', 'GET,POST');
    //     headers.append('Access-Control-Allow-Origin', '*');
    //      return this.httpClient.post(url,reqJson,{headers: headers});
    //  }
     static httpPostCall = function (reqJson: any, url: any, http: any) {
        var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Headers', 'Content-Type');
        // headers.append('Access-Control-Allow-Methods', 'GET,POST');
        // headers.append('Access-Control-Allow-Origin', '*');
        // console.log("Req Json===>"+reqJson);
        // console.log("Req URL===>"+url);
        return http.post(url, reqJson, { headers: headers }).map(res => res.json());
        //.map((responce: Response) => <any>responce.json())
    }
}