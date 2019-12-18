import { Component, OnInit, ViewChild, ElementRef , AfterViewInit  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';
import { UserService } from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  displayedColumns: string[] = ['imgurl',  'id', 'name', 'isPresent', 'viewRecord' ];
  dataSource = new MatTableDataSource([]);
  imgurl: string;

  @ViewChild(MatSort, {static: false}) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, {static: false}) set paginator(sort: MatPaginator) {
    this.dataSource.paginator = sort;
  }

  public empList = [];
  public selectedTab;
  public TOTAL_EMP;
  public presentEmp;
  public absentEmp;
  private startTime;
  private endTime;
  message: string;
  public registeredUsersData;
  public selectedEmpData;
  public disableExportButton;
  private yearlyReport;

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'employee_report', // the id of html/table element
  };
  constructor(
    private apiService: ApiService,
    private notifyService: NotificationService,
    private userService: UserService,
    private modalService: NgbModal,
    private exportAsService: ExportAsService
  ) {}

  ngOnInit() {
    this.disableExportButton = true;
    this.imgurl = 'https://www.tutorialrepublic.com/examples/images/avatar/1.jpg';
    this.selectedTab = 'P';
    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getListOfRegisteredUsers();
  }

  private getListOfRegisteredUsers() {
    this.userService.loadRegisterUsers().subscribe(response => {
      this.registeredUsersData = this.extractDataForRegisteredUsers(response);
      this.TOTAL_EMP = response.count;
      this.getPresentEmployeesDetails(this.startTime, this.endTime, (res) => {
        this.empList = this.extractData(res);
        this.markPresentEmployees();
        console.log('this.empList', this.empList);
      });
      console.log('register result', this.registeredUsersData);

    });
  }

  private markPresentEmployees() {
    this.dataSource.data = this.registeredUsersData.map(user => ({
      ...user , imgurl: 'https://www.tutorialrepublic.com/examples/images/avatar/1.jpg', isPresent: !isNullOrUndefined( this.empList.find(emp => {
        return emp.id === user.id;
      }))
    }));
    // console.log('data' , this.dataSource.data);
  }

  private getPresentEmployeesDetails(startTime, endTime, callBackFn = null) {
    this.apiService.getPresentEmployeesForDate({'start_time': startTime, 'end_time': endTime })
    .subscribe(
      response => {
        if (callBackFn) {
          callBackFn(response);
        }

      }
    );
  }

  private extractDataForRegisteredUsers(response): Array<object> {
    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, department: null, img : null, photo: null, id: 0};

      row.name = element.awi_label;
      row.department = element.awi_subclass;
      row.img = element.img_url;
      row.id = element.id;
      data.push(row);
    });
    console.log(response);
    return data;
  }

  private extractData(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
      this.errorToaster(response.msg);

      return [];
    }

    this.presentEmp = ((response.data.length / this.TOTAL_EMP) * 100).toFixed(2);
    this.absentEmp = (((this.TOTAL_EMP - response.data.length) / this.TOTAL_EMP) * 100).toFixed(2);
    this.successToaster(response.msg);
    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, inTime: null, outTime: null, photo: null, id: 0};

      row.name = element.awi_label;
      row.inTime = element.first_presence;
      row.outTime = element.last_presence;

      // Hard code emp Id
      row.id = element.awi_data.id;

      // const imgKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
      // row.photo = element.awi_data.awi_app_data.awi_blobs[imgKey].img_base64;


      data.push(row);
    });
    console.log(response);
    return data;
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }
  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }

  presentOnPremises() {
    this.selectedTab = 'P';
    this.getPresentEmployeesDetails(this.startTime, this.endTime, (response) => {
      this.empList = this.extractData(response);
    });
    // console.log('yes div 1 as btn');
  }

  absent() {
    this.selectedTab = 'A';
    // console.log('yes div 2 as btn');
  }

  check(row) {
    // console.log(row);
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  empData(element) {
    console.log(element);
    this.selectedEmpData = element;
  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    console.log('enableExportButton:', yearlyReport);
    this.yearlyReport = yearlyReport;
  }

  exportEmployeeYearReport(fileName) {
    this.exportAsService.save(this.exportAsConfig, fileName).subscribe(() => {
    });
  }
}
