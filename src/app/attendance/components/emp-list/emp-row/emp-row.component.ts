import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportToCsv} from 'export-to-csv';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import * as Utils from '../../../common/utils';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { PresentEmpService } from '../../../services/present-emp.service';


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
  public fileDataType;
  private monthlyData;
  private selectedYear;
  private todaysDate;
  

  private yearlyReport;
  exportAsConfig: ExportAsConfig = {
    type: 'csv',
    elementId: 'employee_report',
  };

  constructor(
      private modalService: NgbModal,
      private exportAsService: ExportAsService,
      private apiService: ApiService,
      private notifyService: NotificationService,
      private presentEmpService: PresentEmpService
    ) {
    this.todaysDate = new Date();
   }

  ngOnInit() {
    this.disableExportButton = true;

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  rejectEmployeeAttendance(emp) {
    const startTime = Utils.getStartTimeStampOfGivenDate(this.todaysDate);
    const endTime = Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );
    console.log('empname' , emp.name, ' start time' , startTime, 'end time' , endTime);

    this.apiService.rejectEmpAttendance({'start_time': startTime, 'end_time': endTime, 'awi_label': emp.name})
    .subscribe(
      response => {
        console.log('rejectDatarespone' , response);
        if ( response.success ) {
          this.successToaster(response.msg);
          this.presentEmpService.reject(emp.id)
        } else {
          this.errorToaster(response.msg);
        }
      }
    );

  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    this.yearlyReport = yearlyReport;
    console.log('yerly report', this.yearlyReport);
  }

  employeeMonthlyReportData(monthlyData) {
    this.monthlyData = monthlyData;
    console.log('monthName', this.monthlyData);
  }

  selectedYearForEmp(year) {
    console.log('year', year);
    this.selectedYear = year;
  }

  checkDataMonthlyOrYearly(dataType) {
    this.fileDataType = dataType;
    console.log('file type', this.fileDataType);
  }

  exportEmployeeYearReport(fileName) {
    console.log('export yearly');
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      // title: 'Today\'s Present Employee',
      title: '',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };

    options.filename = fileName + '_' + this.selectedYear.year + '_yearly_attendance';
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.yearlyReport);
  }

  exportEmployeeMonthReport(fileName) {
    const CSVfilename = fileName + '_' + this.monthlyData.month + '_' + this.monthlyData.year.year + '_attendance_record';
    console.log('export monthly');
    this.exportAsService.save(this.exportAsConfig, CSVfilename ).subscribe(() => {
        });
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }
  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }

}

