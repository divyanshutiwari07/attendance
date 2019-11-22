import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // getPresentEmployeesForDate(): Observable <any> {
    
  //   return this.http.get(config.GET_JSON);
  // }

  test(obj): Observable <any> {
     return this.http.post(config.GET_JSON,obj);
  }

  todaysAttendance(obj): Observable <any> {
     return this.http.post(config.TODAYS_ATTENDANCE,obj);
  }
}
