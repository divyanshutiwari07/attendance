import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: any = {};
  empRecord: any = [];
  public disableExportButton;

  private yearlyReport;
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'employee_report', // the id of html/table element
  };

  constructor(private modalService: NgbModal, private exportAsService: ExportAsService) { }

  ngOnInit() {

    this.disableExportButton = true;

    // //  first and last day of current year
    // const getYearFirstDay = new Date(new Date().getFullYear(), 0, 1 );
    // const getYearLastDay = new Date(new Date().getFullYear(), 11, 31);
    // this.getYearFirstDayStartTime = getYearFirstDay.setHours(0, 0, 0, 0);
    // this.getYearLastDayEndTime = getYearLastDay.setHours(23, 59, 59, 999);

    // // first and last day of current month

    // const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    // const getMonthFirstDay = new Date(y, m, 1);
    // const getMonthLastDay = new Date(y, m + 1, 0);
    // this.getMonthFirstDayStartTime = getMonthFirstDay.setHours(0, 0, 0, 0);
    // this.getMonthLastDayEndTime = getMonthLastDay.setHours(23, 59, 59, 999);

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    console.log('enableExportButton:', yearlyReport);
    this.yearlyReport = yearlyReport;
  }

  exportEmployeeYearReport(fileName) {
    this.exportAsService.save(this.exportAsConfig, fileName).subscribe(() => {

    });
  }
}

