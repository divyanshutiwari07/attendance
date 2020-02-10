import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportToCsv} from 'export-to-csv';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import * as Utils from '../../../common/utils';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { PresentEmpService } from '../../../services/present-emp.service';
import {ActivatedRoute, Router} from '@angular/router';
import { map } from 'rxjs/operators';

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
  private imgIndex;
  public currentImg;
  public showNextPreIcon;

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
      private presentEmpService: PresentEmpService,
    ) {
    this.todaysDate = new Date();
    this.showNextPreIcon = false;

   }

  ngOnInit() {
    this.disableExportButton = true;
    this.imgIndex = 0;
    this.currentImg = this.employee.registeredPhoto[this.imgIndex];
    if ( this.employee.registeredPhoto.length >= 2 ) {
      this.showNextPreIcon = true;
    }
  }

  nextImg() {
    const imgLength = this.employee.registeredPhoto.length;
    this.imgIndex = this.imgIndex >= (imgLength - 1) ? 0 : this.imgIndex + 1 ;
    this.currentImg = this.employee.registeredPhoto[this.imgIndex];
  }

  previousImg() {
    const imgLength = this.employee.registeredPhoto.length;
    this.imgIndex = this.imgIndex <= 0 ? (imgLength - 1) : this.imgIndex - 1;
    this.currentImg = this.employee.registeredPhoto[this.imgIndex];
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  openVerticallyCenteredForImgCompare(contentForImgCompare) {
    this.modalService.open(contentForImgCompare, { centered: true, size: 'lg' } );
  }

  rejectEmployeeAttendance(emp) {
    const startTime = Utils.getStartTimeStampOfGivenDate(this.todaysDate);
    const endTime = Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );

    this.apiService.rejectEmpAttendance({'start_time': startTime, 'end_time': endTime, 'awi_label': emp.name})
    .subscribe(
      response => {
        if ( response.success ) {
          this.successToaster(response.msg);
          this.presentEmpService.reject(emp.id);
        } else {
          this.errorToaster(response.msg);
        }
      }
    );

  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    this.yearlyReport = yearlyReport;
  }

  employeeMonthlyReportData(monthlyData) {
    this.monthlyData = monthlyData;
  }

  selectedYearForEmp(year) {
    this.selectedYear = year;
  }

  checkDataMonthlyOrYearly(dataType) {
    this.fileDataType = dataType;
  }

  exportEmployeeYearReport(fileName) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      // title: 'Today\'s Present Employee',
      // title: '',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };
    const empName = Utils.getFirstLaterOfWordCapital(fileName);
    options.filename = empName + '_' + this.selectedYear.year + '_Yearly_Attendance';
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.yearlyReport);
  }

  exportEmployeeMonthReport(fileName) {
    const empName = Utils.getFirstLaterOfWordCapital(fileName);
    const CSVfilename = empName + '_' + this.monthlyData.month + '_' + this.monthlyData.year.year + '_Attendance_Record';
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

