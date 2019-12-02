import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Utils from '../../utils';

// tslint:disable-next-line:max-line-length
// <app-year-drop-down (selectedYear)="this.selectedYearTwo" [onChangeFunction]="getEmployeeRecordForYear()" [yearCount]="5"></app-year-drop-down>

@Component({
  selector: 'app-year-drop-down',
  templateUrl: './year-drop-down.component.html',
  styleUrls: ['./year-drop-down.component.scss']
})
export class YearDropDownComponent implements OnInit {

  public years;
  public selectedValue;

  @Input() onChangeFunction;
  @Input() yearCount;

  @Output() selectedYear: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.initializeYearDropdown();
  }

  changeCallBack() {
    // this.selectedYear = this.selectedValue;
    // this.onChangeFunction();
    // this.selectedYear.emit(this.selectedValue);
  }

  private initializeYearDropdown() {
    const yearCount = this.yearCount ? this.yearCount : 5;
    for ( let i = 0; i < yearCount; i++ ) {
      const row = {year: null, startTimeStamp: null, endTimeStamp: null};
      const year = new Date().getFullYear() - i;
      row.year = year;
      row.startTimeStamp = Utils.getStartTimeStampOfYear(year);
      row.endTimeStamp = Utils.getEndTimeStampOfYear(year);
      this.years.push( row );
    }

    console.log('years' , this.years);
  }

}
