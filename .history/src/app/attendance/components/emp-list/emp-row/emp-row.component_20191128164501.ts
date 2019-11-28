import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: any = {};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    //  first and last day of the year
    const getYearFirstDay = new Date(new Date().getFullYear(), 0, 1 );
    const getYearLastDay = new Date(new Date().getFullYear(), 11, 31);
    const getYearFirstDayStartTime = getYearFirstDay.setHours(0, 0, 0, 0);
    const getYearLastDayEndTime = getYearLastDay.setHours(23, 59, 59, 999);

    // first and last day of current month

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const getMonthFirstDay = new Date(y, m, 1);
    const getMonthLastDay = new Date(y, m + 1, 0);
    const getMonthFirstDayStartTime = getMonthFirstDay.setHours(0, 0, 0, 0);
    const getMonthLastDayEndTime = getMonthLastDay.setHours(23, 59, 59, 999);

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

}
