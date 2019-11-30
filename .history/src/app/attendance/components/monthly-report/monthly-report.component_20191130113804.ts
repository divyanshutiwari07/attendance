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

}
