import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as Utils from '../../common/utils';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

const BACK_YEARS_COUNT = 5;

@Component({
  selector: 'app-yearly-report',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.scss']
})
export class YearlyReportComponent implements OnInit {

  months: any;
  days: any;
  fetching: any;

  @Input() empName ;
  @Output() yearlyReportResponse: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkDataMonthlyOrYearly: EventEmitter<any> = new EventEmitter<any>();
  @Output() employeeMonthlyReportData: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedYearForEmp: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleExportButton: EventEmitter<any> = new EventEmitter<any>();


  public reportMode;
  public employeeMonthReport;
  public employeeYearReport;
  public formattedYearReport;
  public attendanceTable;
  public selectedYear;
  public years = [];
  public showSpinner;
  public showExportButton;
  private checkMonthlyOrYearly;

  constructor(private apiService: ApiService, private notifyService: NotificationService) {
    // tslint:disable-next-line:max-line-length
    this.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.initializeYearDropdown();
  }

  ngOnInit() {
    this.showExportButton = false;
    this.selectedYear = this.years[0];
    this.reportMode = 'Y';
    this.checkMonthlyOrYearly = 'yearly_attendance_record';

    this.getEmployeeRecordForYear();
  }

  initializeYearDropdown() {
    for ( let i = 0; i < BACK_YEARS_COUNT; i++ ) {
      const row = {year: null, startTimeStamp: null, endTimeStamp: null};
      const year = new Date().getFullYear() - i;
      row.year = year;
      row.startTimeStamp = Utils.getStartTimeStampOfYear(year);
      row.endTimeStamp = Utils.getEndTimeStampOfYear(year);
      this.years.push( row );
    }

  }

  goBackOnYearlyRecordPage() {
    this.reportMode = 'Y';
    this.checkMonthlyOrYearly = 'yearly_attendance_record';
    this.checkDataMonthlyOrYearly.emit(this.checkMonthlyOrYearly);
  }


  getEmployeeRecordForYear() {
    this.fetching = 1;
    this.apiService.getPresentEmployeesForYear({
      'start_time': this.selectedYear.startTimeStamp,
      'end_time': this.selectedYear.endTimeStamp,
      'awi_label': this.empName
    }).subscribe((response) => {
      if ( response.success === true ) {
        this.successToaster(response.msg);
        this.showExportButton = true;
        this.toggleExportButton.emit(this.showExportButton);
      }
      this.fetching = 0;
      this.employeeYearReport = this.addPresentEmpDuration(response.data);
      this.checkDataMonthlyOrYearly.emit(this.checkMonthlyOrYearly);
      this.selectedYearForEmp.emit(this.selectedYear);
      this.genrateFormattedReport();
      if (response.success === false) {
        this.errorToaster(response.msg);
      }
    });
  }

  addPresentEmpDuration(employeeYearReport) {
    return employeeYearReport.map((emp) => ({
      ...emp, empPresenceDetails: Utils.getTimeDifferenceBetweenTwoTimestamps(emp.first_presence, emp.last_presence)
    }));
  }

  showMonthlyReport(month) {
    this.employeeMonthReport = {
      month: month,
      year: this.selectedYear,
      report: this.getMonthReport(month),
    };
    this.reportMode = 'M';
    this.checkMonthlyOrYearly = 'monthly_attendance_record';
    this.checkDataMonthlyOrYearly.emit(this.checkMonthlyOrYearly);
    this.employeeMonthlyReportData.emit(this.employeeMonthReport);
  }

  genrateFormattedReport() {
    const formattedYearReport = {monthReport: {}, presentCount: 0, ...this.selectedYear};

    this.employeeYearReport.forEach( record => {
      const date =  parseInt(record.timestamp.split('-')[0], 0);
      const month = Utils.getMonthName( record.timestamp.split('-')[1] );

      if ( !formattedYearReport.monthReport[ month ] ) {
        formattedYearReport.monthReport[ month ] = {detail: {}, presentCount: 0};
      }
      formattedYearReport.monthReport[ month ].detail[date] = record;
      formattedYearReport.monthReport[ month ].presentCount += 1;

      formattedYearReport.presentCount += 1;
    });
    this.formattedYearReport = formattedYearReport;
    this.generateAttendanceTable();
  }

  generateAttendanceTable() {
    this.attendanceTable = [];
    this.months.forEach((month) => {
      const monthData: any = {
        Month: month
      };
      this.days.forEach((day) => {
        monthData[' ' + day] = this.checkIfPresentOnThisDate(day, month) ? 'P' : 'A';
      });
      monthData['Present'] = this.formattedYearReport.monthReport[month] ? this.formattedYearReport.monthReport[month].presentCount : 0;
      this.attendanceTable.push(monthData);

    });
    this.yearlyReportResponse.emit(this.attendanceTable);
  }

  getMonthReport(month) {
    const monthNumber = this.getMonthNumber(month);
    return this.employeeYearReport.filter(o => {
      return o.timestamp.split('-')[1] === monthNumber && o.timestamp.split('-')[2] === this.selectedYear.year.toString();
    });
  }


  getMonthNumber(monthName) {
    const monthNumber = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(monthName) / 3) + 1;
    return String('0' + monthNumber).slice(-2);
  }

  getPresentClassName(day, month) {
    const currentObj = this.checkIfPresentOnThisDate(day, month);
    if ( !currentObj ) { return ''; }
    const presentHours = parseInt(currentObj.empPresenceDetails.totalHoursEmpPresentToday.split(':')[0], 0);
    if ( presentHours < 1 ) {
      // return 'half-present';
      return 'present';
    } else {
      return 'present';
    }
  }

  checkIfPresentOnThisDate(day, monthName) {
    const monthNumber = this.getMonthNumber(monthName);
    return this.employeeYearReport.find(o => {
      const a = o.timestamp === (day + '-' + monthNumber + '-' + this.selectedYear.year);
      return a;
    });
  }

  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }

}
