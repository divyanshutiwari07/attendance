import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportToCsv} from 'export-to-csv';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import * as Utils from '../../../common/utils';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: any = {};
  empRecord: any = [];
  public disableExportButton;
  private fileDataType;

  private yearlyReport;
  exportAsConfig: ExportAsConfig = {
    type: 'csv',
    elementId: 'employee_report',
  };

  constructor(private modalService: NgbModal, private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.disableExportButton = true;

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    this.yearlyReport = yearlyReport;
    console.log('yerly report', this.yearlyReport);
  }

  checkDataMonthlyOrYearly(dataType) {
    this.fileDataType = dataType;
    console.log('file type', this.fileDataType);
  }

  exportEmployeeYearReport(fileName) {
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

    options.filename = fileName + '_' + this.fileDataType;
    const csvExporter = new ExportToCsv(options);

    // const mapTo: any = {
    //   month: 'Month',
    //   "01": "01",
    //   "02": "02",
    //   "03": "03",
    //   "04": "04",
    //   "05": "05",
    //   "06": "06",
    //   "07": "07",
    //   "08": "08",
    //   "09": "09",
    //   "10": "10",
    //   "11": "11",
    //   presentCount: "Present"
    // };

    // csvExporter.generateCsv(Utils.getFormattedCSVdata(this.yearlyReport , mapTo));
    csvExporter.generateCsv(this.yearlyReport);
    //csvExporter.generateCsv(Utils.getFormattedCSVdata(this.employees , mapTo));
  }


  // exportEmployeeYearReport(fileName ) {
  //   this.exportAsService.save(this.exportAsConfig, fileName + '_' + this.fileDataType).subscribe(() => {
  //   });
  // }
}

