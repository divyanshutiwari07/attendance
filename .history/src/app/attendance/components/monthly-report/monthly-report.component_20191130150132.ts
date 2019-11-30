import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {
  months: any;
  days: any;
  Object = Object;
  @Input() monthReport;

  private month;

  constructor() {
    // tslint:disable-next-line:max-line-length
    this.days = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  ngOnInit() {
    console.log(this.monthReport);
  }

  // ngOnChanges() {
  //   console.log(this.monthReport);
  //   this.month = this.monthReport.month;
  // }
  getMonthNumber(monthName) {
    const monthNumber = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(monthName) / 3) + 1;
    return String('0' + monthNumber).slice(-2);
  }

  checkIfPresentOnThisDate(day, monthName) {
    const monthNumber = this.getMonthNumber(monthName);
    return this.monthReport.report.find(o => {
      return o.timestamp === (day + '-' + monthNumber + '-2019');
    });
  }

  checkIfPresentOnThisDates(day, monthName) {
    const monthNumber = this.getMonthNumber(monthName);
    return this.monthReport.report.find(o => {
      if (o.timestamp === (day + '-' + monthNumber + '-2019')) {
        return o.day_of_month;
      }
    });
  }
}
