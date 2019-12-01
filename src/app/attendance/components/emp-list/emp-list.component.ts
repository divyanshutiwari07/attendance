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

  constructor() { }

  ngOnChanges() {
    console.log(this.employees);
  }

  exportCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };

    options.filename = 'Present-employee-02-12-2019';
    const csvExporter = new ExportToCsv(options);

    const mapTo = {name: 'Name', id: 'Employee Id', inTime: 'In Time', outTime: 'Out Time', photo : 'Photo' };

    csvExporter.generateCsv(Utils.getFormattedCSVdata(this.employees, mapTo));
  }

}
