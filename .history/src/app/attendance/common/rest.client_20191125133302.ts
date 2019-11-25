import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RestClient {
    private httpOptions: any;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'token': localStorage.getItem('token')
            })
        };
    }

    get(url: string, payload: Object = null) {

        if (isNullOrUndefined(payload)) {
            return this.http.get(url, this.httpOptions);
        } else {
            console.log('reso');
            return this.http.post(url, payload, this.httpOptions);
        }
    }

    post(url: string, payload: object = {}) {
        return this.http.post(url, payload, this.httpOptions);
    }
}
