import { Component, OnInit, ViewChild, ElementRef , AfterViewInit  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';
import { UserService } from '../../services/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';
import * as Utils from '../../common/utils';
import { SearchPipe } from '../../common/filters/search';
import { config } from '../../../config';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'department',  'isPresent', 'viewRecord' ];
  dataSource = new MatTableDataSource([]);
  searchText;

  @ViewChild(MatSort, {static: false}) set matSort(sort: MatSort) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
      return data[sortHeaderId];
    };
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, {static: false}) set paginator(sort: MatPaginator) {
    this.dataSource.paginator = sort;
  }

  public empList = [];
  public searchedList = [];
  public selectedTab;
  public TOTAL_EMP;
  public presentEmp;
  // public absentEmp;
  private startTime;
  private endTime;
  message: string;
  public registeredUsersData;
  public selectedEmpData;
  public disableExportButton;
  private yearlyReport;
  private startTimeStamp;
  private endTimeStamp;
  public todaysDate;
  public allDepartmentList;
  public allLocationList;

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'employee_report', // the id of html/table element
  };
  constructor(
    private apiService: ApiService,
    private notifyService: NotificationService,
    private userService: UserService,
    private modalService: NgbModal,
    private exportAsService: ExportAsService,
    private socket: Socket

  ) {}

  ngOnInit() {
    // this.selectedDate = new Date();
    this.todaysDate = new Date();
    this.disableExportButton = true;
    this.selectedTab = 'P';
    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getListOfRegisteredUsers();
    const socketMsg = this.getMessage();
    console.log("socketMsg", socketMsg);
  }

  private getListOfRegisteredUsers() {
    this.userService.loadRegisterUsers().subscribe(response => {
      this.registeredUsersData = this.extractDataForRegisteredUsers(response);
      console.log('register result', this.registeredUsersData);
      this.TOTAL_EMP = response.count;
      this.getPresentEmployeesDetails(this.startTime, this.endTime, (res) => {
        this.empList = this.extractData(res);
        this.allDepartmentList = this.getAllDepartmentList(this.empList);
        this.allLocationList = this.getAllLocationList(this.empList);
        this.markPresentEmployees();
        console.log('this.empList', this.empList);
      });
    });
  }

  sendMessage(msg: string){
    // this.socket.emit("my-event", msg);
  }
 getMessage() {
    return this.socket
        .fromEvent("my-event");
}

  private getAllLocationList(empList) {
    const locationList = empList.map(a => a.location);
     return  [...new Set( locationList)].map((d) => {
          const obj = {id: d };
          return obj;
         } );
  }

  private getAllDepartmentList(empList) {
    const departmentList = empList.map(a => a.department);
     return  [...new Set( departmentList)].map((d) => {
          const obj = {id: d };
          return obj;
         } );
  }

  private markPresentEmployees() {
    this.dataSource.data = this.registeredUsersData.map(user => ({
      // tslint:disable-next-line:max-line-length
      ...user , isPresent: !isNullOrUndefined( this.empList.find(emp => {
        return emp.id === user.id;
      }))
    }));
  }

  private getPresentEmployeesDetails(startTime, endTime, callBackFn = null) {
    this.apiService.getPresentEmployeesForDate({'start_time': startTime, 'end_time': endTime })
    .subscribe(
      response => {
        if (callBackFn) {
          console.log('present emp today' , response);
          callBackFn(response);
        }

      }
    );
  }

  private extractDataForRegisteredUsers(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
      this.errorToaster(response.msg);
      console.log('no registered users data found');
      return [];
    }

    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, department: null, photo: null, id: 0};

      row.name = element.awi_label;
      row.department = element.awi_subclass;
      // row.photo  = element.img_url[0];
      const img = element.imgs[0];
      row.photo = this.getUpdatedImageUrl(img);
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
    // this.absentEmp = (((this.TOTAL_EMP - response.data.length) / this.TOTAL_EMP) * 100).toFixed(2);
    this.successToaster(response.msg);
    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, inTime: null, outTime: null, location: null, department: null, photo: null, id: 0};

      const dynamicKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];

      row.name = element.awi_label;
      row.inTime = element.first_presence;
      row.outTime = element.last_presence;
      row.location = element.awi_data.location;

      row.department = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

      row.id = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

      // const imgKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
      const img = element.awi_data.awi_app_data.awi_blobs[dynamicKey].img_base64;
      row.photo = this.getUpdatedImageUrl(img);
      // row.photo = "https://www.tutorialrepublic.com/examples/images/avatar/1.jpg";
      data.push(row);
    });
    console.log(response);
    return data;
  }

  // getUpdatedImageUrlForRegister(img_url) {
  //   const url = config.SERVER_ADDRESS_FOR_REGISTER + config.PORT + img_url;
  //   console.log('url', url);
  //   return url;
  // }

  getUpdatedImageUrl(img_url) {
    const host = img_url.split('/')[2].split(':')[0];
    const port = img_url.split('/')[2].split(':')[1];

    let url = img_url.replace(host, config.SERVER_ADDRESS);
    url     = url.replace(port, config.PORT);
    return url;
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
  }

  absent() {
    this.selectedTab = 'A';
    // console.log('yes div 2 as btn');
  }

  searchEmployee(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  empData(element) {
    console.log('selectedempdata', element);
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

  getEmployeeRecordForGivenDate() {
    console.log('given data');
  }

  getEmployeeRecordForSelectedDate(selectedDate) {
    console.log(selectedDate);
    this.startTimeStamp = Utils.getStartTimeStampOfGivenDate(selectedDate);
    this.endTimeStamp = Utils.getEndTimeStampOfGivenDate(selectedDate);
    console.log('formated date', this.startTimeStamp, this.endTimeStamp);
    this.getPresentEmployeesDetails(this.startTimeStamp, this.endTimeStamp, (res) => {
      this.empList = this.extractData(res);
      this.markPresentEmployees();
      console.log('this.empList', this.empList);
    });
    // row.startTimeStamp = Utils.getStartTimeStampOfYear(year);
    // row.endTimeStamp = Utils.getEndTimeStampOfYear(year);
  }

  // onSearchChange(searchedText) {
  //   if (!searchedText || searchedText.length) {
  //     this.searchedList = Object.assign([], this.empList);
  //   }
  //   this.searchedList = this.searchPipe.transform(this.empList, 'entryForm', searchedText);
  // }
}

