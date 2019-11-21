import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // getPresentEmployeesForDate(): Observable <any> {
    
  //   return this.http.get(config.GET_JSON);
  // }

  test(obj): Observable <any> {
     return this.http.post(config.LOGIN_URL, obj);
  }

