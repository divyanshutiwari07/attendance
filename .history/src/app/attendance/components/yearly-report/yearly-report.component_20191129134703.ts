import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-yearly-report',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.scss']
})
export class YearlyReportComponent implements OnInit {

  employeeYearReport: any;
  months: any;
  days: any;

  @Input() empId: any = [] ;

  public reportMode;

  public employeeMonthReport;

  constructor() { }

  ngOnInit() {
    this.reportMode = 'Y';
    console.log('YearlyReportComponent::ngOnInit', 'empId:', this.empId[0] );
    this.employeeYearReport = {
      'Jan' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        4: null
      },
      'Feb' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'}
      },
      'Mar' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        25: {inTime: '12', outTime: '233'}
      },
      'Apr' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        15: {inTime: '12', outTime: '233'}
      },
      'May' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        4: null
      },
      'Jun' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'}
      },
      'Jul' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        25: {inTime: '12', outTime: '233'}
      },
      'Aug' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        15: {inTime: '12', outTime: '233'}
      },
      'Sep' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        4: null
      },
      'Oct' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'}
      },
      'Nov' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        25: {inTime: '12', outTime: '233'}
      },
      'Dec' : {
        1: {inTime: '12', outTime: '233'},
        2: null,
        3: {inTime: '12', outTime: '233'},
        5: {inTime: '12', outTime: '233'},
        15: {inTime: '12', outTime: '233'}
      },
    };

    // this.months = Object.keys(this.employeeYearReport);
    this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  // showMonthlyReport(month) {
  //   this.employeeMonthReport = {
  //     month: month,
  //     report: this.employeeYearReport[month]
  //   };
  //   this.reportMode = 'M';
  // }

}
