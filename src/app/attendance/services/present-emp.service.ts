import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class PresentEmpService {
  // Observable navItem source
  private empListSource = new BehaviorSubject([]);
  // Observable navItem stream
  empList$ = this.empListSource.asObservable();
  // service command
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
