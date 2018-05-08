import { Injectable, NgModule } from '@angular/core';
import { IWebServiceCallback } from '../network_layer/IWebServiceCallback';
import { ApiConstants } from './api_constants';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'


@Injectable()
export class ServiceCall {

    constructor(private httpClient: HttpClient) { }

    getPlans(url): Observable<any> {
        return this.httpClient.get(url, { responseType: 'json' });
    }


    static httpPostCall = function (reqJson: any, url: any, http: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return http.post(url, reqJson, { headers: headers }).map(res => res.json());

    }
}