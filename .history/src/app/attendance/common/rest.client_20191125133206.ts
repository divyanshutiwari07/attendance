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
            //   'token': localStorage.getItem('token')
            'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYXdpX2NsaWVudF9pZCI6MiwiYXdpcm9zIjoicGl5dXNoQGF3aWRpdC5jb20iLCJsZXZlbCI6ImF3aV91c2VyIiwiaWF0IjoxNTc0MzIwOTUwLCJleHAiOjE1NzQ0MDczNTB9.E4R4AHWCNfCv7BYNNH-zKbnAlQ8dbyGXqvSQMQdB6KQ'
            })
        };
    }

    get(url: string, payload: Object = null) {

        if (isNullOrUndefined(payload)) {
            return this.http.get(url, this.httpOptions);
        } else {
            return this.http.post(url, payload, this.httpOptions);
        }
    }

    post(url: string, payload: object = {}) {
        return this.http.post(url, payload, this.httpOptions);
    }
}
