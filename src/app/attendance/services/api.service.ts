import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { RestClient } from '../common/rest.client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: RestClient) { }

  login(obj): Observable <any> {
    return this.http.post(config.LOGIN_URL, obj);
  }

  getPresentEmployeesForDate(obj): Observable <any> {
    return this.http.get(config.TODAYS_ATTENDANCE, obj);
  }
  register(obj): Observable <any> {
    return this.http.get(config.REGISTER_URL, obj);
  }

  getPresentEmployeesForYear(obj): Observable <any> {
    return this.http.get(config.TODAYS_ATTENDANCE, obj);
  }

  getChartData(obj): Observable <any> {
    return this.http.get(config.TODAYS_ATTENDANCE, obj);
  }

  getListOfRegisteredUser(): Observable <any> {
    return this.http.get(config.LIST_OF_REGISTER_URL, {});
  }

  rejectEmpAttendance(obj): Observable <any> {
    return this.http.get( config.REJECT_ATTENDANCE_URL, obj );
  }

  getListOfSources(): Observable <any> {
    return this.http.get(config.LIST_OF_SOURCES_URL, {});
  }

  verifyEmployeePresence(obj): Observable <any> {
    return this.http.get(config.VERIFY_EMPLOYEE_PRESENCE_URL, obj);
  }
}

