import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { Observable, Observer } from 'rxjs';
import { RestClient } from '../common/rest.client';
import { config } from '../../config';

@Injectable()
export class PresentEmpService {
  public presentEmp = {};

  // Observable navItem source
  private empListSource = new BehaviorSubject([]);
  // Observable navItem stream
  empList$ = this.empListSource.asObservable();
  // service command

  constructor(private http: RestClient) {}

  private savePresentEmpData(presentEmpData) {
    this.presentEmp = presentEmpData;
  }

  public loadPresentEmployees(req): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      if ( !Object.keys(this.presentEmp).length ) {
          this.http.get(config.TODAYS_ATTENDANCE, req).subscribe(response => {
            this.savePresentEmpData(response);
            observer.next(response);
            observer.complete();
          });
      } else {
        observer.next(this.presentEmp);
      }
    });
  }
  
  changeList(newEmpList) {
    this.empListSource.next(newEmpList);
  }

  reject(empId) {
    const existingEmpList = this.empListSource.getValue();
    const newEmpList = existingEmpList.filter((emp) => {
        return emp.id !== empId;
    });
    this.changeList(newEmpList);
  }
}
