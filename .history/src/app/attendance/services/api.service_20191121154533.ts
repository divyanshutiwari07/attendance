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
  //   // console.log(config.production);
  //   return this.http.get(config.GET_JSON);
  // }
  getPresentEmployeesForDate(): Observable <any> {
    this.http.get(config.GET_JSON).subscribe(res => {
      return res;

  }

}
