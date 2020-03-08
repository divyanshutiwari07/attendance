import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as Utils from './../../../common/utils';
import {BACK_YEAR_COUNT} from '../../../../config';

@Component({
  selector: 'app-visitor-history-modal',
  templateUrl: './visitor-history-modal.component.html',
  styleUrls: ['./visitor-history-modal.component.scss']
})
export class VisitorHistoryModalComponent implements OnInit {
  @Input() visitor: string;

  public selectedYear: any;
  public years: any [];

  constructor(
      public modal: NgbActiveModal
  ) {
    if( !this.years ) {
      this.years = [];
      this.initializeYearDropdown();
    }
  }

  ngOnInit() {
  }

  initializeYearDropdown() {
    for ( let i = 0; i < BACK_YEAR_COUNT; i++ ) {
      const row = {year: null, startTimeStamp: null, endTimeStamp: null};
      const year = new Date().getFullYear() - i;
      row.year = year;
      row.startTimeStamp = Utils.getStartTimeStampOfYear(year);
      row.endTimeStamp = Utils.getEndTimeStampOfYear(year);
      this.years.push( row );
    }

  }

}
