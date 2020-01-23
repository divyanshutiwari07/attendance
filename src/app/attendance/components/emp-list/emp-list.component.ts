import { Component, Input, OnChanges  } from '@angular/core';
import {ExportToCsv} from 'export-to-csv';
import * as Metadata from './../../common/metadata/metadata';
import * as Utils from '../../common/utils';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnChanges {

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
  public selectedEntryType;
  private csvDate;


  sortByList = Metadata.getSortOptions();
  arrivalTimes = Metadata.getTimeRange();
  filterByType = Metadata.getManualFilterOptions();

  constructor() {
    this.todaysDate = new Date();
    this.selectedList = Metadata.getSortOptions()[0].id;
  }

  ngOnChanges() {
    this.departments = this.allDepartmentList;
    this.locations = this.allLocationList;

    console.log('this.employees', this.employees);

  }


  exportCSV() {
    console.log('this.employees', this.employees);
    if (this.employees.length !== 0) {
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

      options.filename = 'Employees_present_on_' + Utils.getFormattedDate( this.todaysDate );
      const csvExporter = new ExportToCsv(options);

      // tslint:disable-next-line:max-line-length
      const mapTo = {id: 'Employee Id', name: 'Employee Name', department : 'Department', inTimeForCSV: 'In Time', location: 'Entry Location', outTime: 'Out Time' };

      csvExporter.generateCsv(Utils.getFormattedCSVdata(this.employees , mapTo));
    }

  }

}
