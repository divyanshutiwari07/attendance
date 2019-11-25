import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.scss']
})
export class MonthlyReportComponent implements OnChanges {

  Object = Object;
  @Input() monthReport;

  private month;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.monthReport);
    this.month = this.monthReport.month;
  }

}
