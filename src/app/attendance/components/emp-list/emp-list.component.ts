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
  public selectedList;

  // searchText;
  location = [
    {name: 'fd ', id: 'fd'},
    {name: 'HW ', id: 'hw'}
  ];
  departments = [
    {name: 'Sales ', id: 'Sales'},
    {name: 'Engineer ', id: 'Engineer'}
  ];
  sortByList = [
    {name: 'Alphabetic Order', id: 'name'},
    {name: 'Latest Time', id: 'inTime'},
  ];
  arrivalTimes = [
    {name: '6 AM -  7 AM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '7 AM -  8 AM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '8 AM -  9 AM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '9 AM -  10 AM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '10 AM - 11 AM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '11 AM - 00 PM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '00 PM - 1 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '01 PM - 2 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '02 PM - 3 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '03 PM - 4 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '04 PM - 5 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '05 PM - 6 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '06 PM - 7 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '07 PM - 8 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '08 PM - 9 PM',  id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '09 PM - 10 PM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '10 PM - 11 PM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },
    {name: '11 PM - 12 PM', id: { firstTime: '1576747800000', lastTime: '1576751400000'} },

    
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
