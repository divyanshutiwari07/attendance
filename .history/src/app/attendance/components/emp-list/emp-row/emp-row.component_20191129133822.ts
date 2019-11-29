import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: any = {};
  getMonthFirstDayStartTime: any;
  getMonthLastDayEndTime: any;
  getYearLastDayEndTime: any;
  getYearFirstDayStartTime: any;
  empRecord: any;

  constructor(private modalService: NgbModal, private apiService: ApiService) { }

  ngOnInit() {
    //  first and last day of current year
    const getYearFirstDay = new Date(new Date().getFullYear(), 0, 1 );
    const getYearLastDay = new Date(new Date().getFullYear(), 11, 31);
    this.getYearFirstDayStartTime = getYearFirstDay.setHours(0, 0, 0, 0);
    this.getYearLastDayEndTime = getYearLastDay.setHours(23, 59, 59, 999);

    // first and last day of current month

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const getMonthFirstDay = new Date(y, m, 1);
    const getMonthLastDay = new Date(y, m + 1, 0);
    this.getMonthFirstDayStartTime = getMonthFirstDay.setHours(0, 0, 0, 0);
    this.getMonthLastDayEndTime = getMonthLastDay.setHours(23, 59, 59, 999);

  }

  openVerticallyCentered(content) {
    // tslint:disable-next-line:max-line-length
    this.apiService.getPresentEmployeesForDate({'start_time': this.getYearFirstDayStartTime, 'end_time': this.getYearLastDayEndTime, 'awi_label': this.employee.name })
    .subscribe((response) => this.empRecord = response.data
    );

    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });

  }
  
}

