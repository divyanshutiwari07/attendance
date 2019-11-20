import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // getPresentEmployeesForDate(): Observable <any> {
  //   console.log("Here");
  //   // return this.http.get(`https://restcountries.eu/rest/v2/all`)
  //   //   .map()
  // }
}
