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
            console.log(this.httpOptions.headers);
            return this.http.post(url, payload, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYXdpcm9zIjoiYXdpcm9zdGVjaEBnbWFpbC5jb20iLCJsZXZlbCI6ImF3aV9hZG1pbiIsImlhdCI6MTU3NDY2NjU2OCwiZXhwIjoxNTc0NzUyOTY4fQ.F4OH36qkGpIU5EQMc5ES0g_SOQ44Pv-fZk7w4EBWw30');

        }
    }

    post(url: string, payload: object = {}) {
        return this.http.post(url, payload, this.httpOptions);
    }
}
