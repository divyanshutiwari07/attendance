import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import {ExportToCsv} from 'export-to-csv';
import * as Metadata from './../../common/metadata/metadata';
import * as Utils from '../../common/utils';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnChanges, OnInit {

  @Input() employees: Array<object>;
  @Input() searchText;
  @Input() allDepartmentList: Array<object>;
  @Input() allLocationList: Array<object>;

  public selectedDepartment;
  public selectedLocation;
  public selectedList;
  public selectedTime;
  public departments;
  public locations;
  private todaysDate;
  currentItemsToShow = [];

  sortByList = Metadata.getSortOptions();
  arrivalTimes = Metadata.getTimeRange();

  constructor() {
    this.todaysDate = new Date();
  }

  ngOnInit() {
    // setInterval(() => {
    //   this.onPageChange( {
    //     'previousPageIndex': 0,
    //     'pageIndex': 0,
    //     'pageSize': 2,
    //     'length': 100
    //   } );
    // }, 500);

  }

  ngOnChanges() {
    this.departments = this.allDepartmentList;
    this.locations = this.allLocationList;
    this.currentItemsToShow = this.employees;
  }

  // onPageChange($event) {
  //   console.log('event', $event);
  //   this.currentItemsToShow =  this.employees.slice
  //   ($event.pageIndex * $event.pageSize,
  //   $event.pageIndex * $event.pageSize +
  //   $event.pageSize);
  // }

  exportCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      // title: 'Today\'s Present Employee',
      title: '',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };

    options.filename = 'Present employees at ' + Utils.getFormattedDate(this.todaysDate);
    const csvExporter = new ExportToCsv(options);

    const mapTo = {name: 'Name', id: 'Employee Id', inTime: 'In Time', outTime: 'Out Time', photo : 'Photo' };

    csvExporter.generateCsv(Utils.getFormattedCSVdata(this.employees , mapTo));
  }

}
