import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';


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
  public disableViewRecordColumn;

  private yearlyReport;
  exportAsConfig: ExportAsConfig = {
    type: 'csv',
    elementId: 'employee_report',
  };

  constructor(private modalService: NgbModal, private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.disableViewRecordColumn = true;
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

  exportEmployeeYearReport(fileName ) {
    this.disableViewRecordColumn = false;
    this.exportAsService.save(this.exportAsConfig, fileName + '_' + this.fileDataType).subscribe(() => {
    });
  }
}

