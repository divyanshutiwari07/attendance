import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnInit {

  Object = Object;
  @Input() monthReport;

  private month;

  constructor() { }

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
    return this.monthReport.find(o => {
      return o.timestamp === (day + '-' + monthNumber + '-2019');
    });
  }

}
