import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-viisitor-history-yearly',
  templateUrl: './visitor-history-yearly.component.html',
  styleUrls: ['./visitor-history-yearly.component.scss']
})
export class VisitorHistoryYearlyComponent implements OnInit {

  @Input() visitor: string;
  @Input() selectedYear: string;

  constructor() { }

  ngOnInit() {
  }

}
