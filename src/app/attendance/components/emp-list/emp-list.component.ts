import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {ExportToCsv} from 'export-to-csv';

import * as Utils from '../../common/utils';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnChanges {

  @Input() employees: Array<object>;
  @Input() searchText;

  private currentDate;
  public selectedDepartment;
  public selectedLocation;
  // searchText;
  location = [
    {name: 'fd ', id: 'fd'},
    {name: 'HW ', id: 'hw'}
  ];
  departments = [
    {name: 'Sales ', id: 'Sales'},
    {name: 'Engineer ', id: 'Engineer'}
  ];

  // names = [
  //   {name: 'Mohd. Taufizul', id: 'Taufizul'},
  //   {name: 'Vikram Kumar', id: 'vikram'}
  // ];

  constructor() {
    this.getCurrentDate();
  }

  ngOnChanges() {
    console.log(this.employees);
  }

  getCurrentDate() {
    this.currentDate = new Date();
    const dd = String(this.currentDate.getDate()).padStart(2, '0');
    const mm = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = this.currentDate.getFullYear();
    this.currentDate = mm + '-' + dd + '-' + yyyy;
    console.log(this.currentDate);
  }

  exportCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Today\'s Present Employee',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };

    options.filename = 'Present-employees at ' + this.currentDate;
    const csvExporter = new ExportToCsv(options);

    const mapTo = {name: 'Name', id: 'Employee Id', inTime: 'In Time', outTime: 'Out Time', photo : 'Photo' };

    csvExporter.generateCsv(Utils.getFormattedCSVdata(this.employees , mapTo));
  }

}
