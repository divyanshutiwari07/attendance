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
    // console.log('enableExportButton:', yearlyReport);
    this.yearlyReport = yearlyReport;
  }

  exportEmployeeYearReport(fileName) {
    this.exportAsService.save(this.exportAsConfig, fileName).subscribe(() => {
    });
  }
}

