import { Component, Input, OnInit } from '@angular/core';

import * as Utils from '../../common/utils.js';

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
  public formattedReport;

  constructor() {}

  ngOnInit() {
    // console.log(this.monthReport);
    this.days = Utils.getDateObjectsInMonth( parseInt(Utils.getMonthNumber(this.monthReport.month), 0) - 1, this.monthReport.year.year);
    const monthReport = [];
    this.days.forEach((day) => {
      const data = this.checkIfPresentOnThisDate(day.getDate(), this.monthReport.month);
      if (data) {
        monthReport.push(data);
      } else {
        monthReport.push({day_of_month: day.getDate()});
      }
      // console.log('data ' + this.formattedReport);
    });
    this.formattedReport = monthReport;
    // console.log('formate', this.formattedReport);
  }

  checkIfPresentOnThisDate(day, monthName) {
    const monthNumber = Utils.getMonthNumber(monthName);
    return this.monthReport.report.find(o => {
      return o.timestamp === (Utils.padStart(day, '0', 2) + '-' + monthNumber + '-' + this.monthReport.year.year);
    });
  }

}
