import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-detail-modal',
  templateUrl: './emp-detail-modal.component.html',
  styleUrls: ['./emp-detail-modal.component.scss']
})
export class EmpDetailModalComponent implements OnInit {

  employeeYearReport: any;
  months: any;
  days: any;

  constructor() { }

  ngOnInit() {
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
    };

    this.months = Object.keys(this.employeeYearReport);
    this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  }



}
