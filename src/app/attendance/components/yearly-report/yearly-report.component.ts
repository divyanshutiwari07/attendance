import { Component, OnInit, Input } from '@angular/core';
import {ApiService} from '../../services/api.service';

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

  public reportMode;

  public employeeMonthReport;
  public employeeYearReport;
  private selectedYear;

  constructor(private apiService: ApiService) {
    // tslint:disable-next-line:max-line-length
    this.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  ngOnInit() {
    this.selectedYear = '2019';
    this.fetching = 1;
    this.reportMode = 'Y';
    console.log('YearlyReportComponent::ngOnInit', 'empName:', this.empName);
    //  first and last day of current year

    const yearFirstDay = (new Date(new Date().getFullYear(), 0, 1 )).setHours(0, 0, 0, 0);
    const yearLastDay = (new Date(new Date().getFullYear(), 11, 31)).setHours(23, 59, 59, 999);

    // this.months = Object.keys(this.employeeYearReport);
    // tslint:disable-next-line:max-line-length
    this.apiService.getPresentEmployeesForDate({
      'start_time': yearFirstDay, 'end_time': yearLastDay, 'awi_label': this.empName
    }).subscribe((response) => {
      this.fetching = 0;
      this.employeeYearReport = response.data;
    });
  }

  showMonthlyReport(month) {
    this.employeeMonthReport = {
      month: month,
      year: this.selectedYear,
      report: this.getMonthReport(month),
    };
    this.reportMode = 'M';
  }

  getMonthReport(month) {
    const monthNumber = this.getMonthNumber(month);
    return this.employeeYearReport.filter(o => {
      return o.timestamp.split('-')[1] === monthNumber && o.timestamp.split('-')[2] === this.selectedYear;
    });
  }


  getMonthNumber(monthName) {
    const monthNumber = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(monthName) / 3) + 1;
    return String('0' + monthNumber).slice(-2);
  }

  checkIfPresentOnThisDate(day, monthName) {
    const monthNumber = this.getMonthNumber(monthName);
    return this.employeeYearReport.find(o => {
      return o.timestamp === (day + '-' + monthNumber + '-2019');
    });
  }


}
