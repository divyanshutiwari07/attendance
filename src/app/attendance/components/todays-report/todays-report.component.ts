import { Component, OnInit, ViewChild, ElementRef , AfterViewInit  } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { PresentEmpService } from '../../services/present-emp.service';
import { UserDataHomePageService } from '../../services/user.data.home.page.service';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';

import { isNullOrUndefined } from 'util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';
import * as Utils from '../../common/utils';
import { config } from '../../../config';
import {ExportToCsv} from 'export-to-csv';
import { AuthGuard } from 'src/app/shared';

@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'department',  'isPresent', 'viewRecord', 'action' ];
  dataSource = new MatTableDataSource([]);

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
  public message: string;
  public registeredUsersData;
  public selectedEmpData;
  public disableExportButton;
  private yearlyReport;
  private startTimeStamp;
  private endTimeStamp;
  public todaysDate;
  public allDepartmentList;
  public allLocationList;
  private allEmpIdList;
  public searchText;
  public fileDataType;
  private monthlyData;
  private selectedYear;
  private selectedDate;
  private presentEmpSubscription;

  exportAsConfig: ExportAsConfig = {
    type: 'csv',
    elementId: 'employee_report',
  };

  constructor(
    private apiService: ApiService,
    private notifyService: NotificationService,
    private userService: UserService,
    private modalService: NgbModal,
    private exportAsService: ExportAsService,
    private userData: UserDataHomePageService,
    private auth: AuthGuard,
    private presentEmpService: PresentEmpService
  ) {}

  ngOnInit() {
    console.log('config', config.LIVE_STREAM_PORT);
    this.todaysDate = new Date();
    this.disableExportButton = true;
    this.selectedTab = 'P';
    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getListOfRegisteredUsers();
    this.startSocketConnection();
    this.checkNewPresentEmp();
    this.presentEmpSubscription = this.presentEmpService.empList$
      .subscribe(empList => {
        this.empList = empList;
        this.presencePercentage(this.empList);
        this.addRegisteredPhotoToPresentEmpList(this.empList);
        this.allDepartmentList = this.getAllDepartmentList( this.empList );
        this.allLocationList = this.getAllLocationList(this.empList);
        this.allEmpIdList = this.getAllEmpIdList(this.empList);
        console.log('all emp id', this.allEmpIdList);
      });
  }

  startSocketConnection() {
    this.userData.initConnection('Access Real Time Data from server');
  }

  private checkNewPresentEmp() {
    this.userData.messages.subscribe(data => {
      console.log('Data' , data);
      const newEmpData = this.extractDataForNewEmp(data);
      console.log('newData' , newEmpData);
      if ( newEmpData ) {
        if ( !this.checkEmpAlreadyPresent( newEmpData.id ) ) {
          if ( this.checkEmpIsRegistered(newEmpData.id) ) {
            this.empList.unshift( newEmpData );
            this.presentEmpService.changeList(this.empList);
            console.log('this.empllist 116', this.empList);
            this.addRegisteredPhotoToPresentEmpList(this.empList);
            this.allDepartmentList = this.getAllDepartmentList( this.empList );
            this.allLocationList = this.getAllLocationList(this.empList);
            this.allEmpIdList = this.getAllEmpIdList(this.empList);
            console.log('emp id ', this.allEmpIdList);
          }
        } else {
          // console.log('emp id ', this.allEmpIdList);
          console.log('emp already present');
        }
      }
    });
  }

  private getListOfRegisteredUsers() {
    this.userService.loadRegisterUsers().subscribe(response => {
      console.log('register data 1', response);
      this.registeredUsersData = this.extractDataForRegisteredUsers(response);
      console.log('register result', this.registeredUsersData);
      this.TOTAL_EMP = response.count;
      this.getPresentEmployeesDetails(this.startTime, this.endTime, (res) => {
        const empList = this.extractData(res);
        this.presencePercentage(empList);
        console.log('updated emplist ', empList);
        // this.checkEmpIsRegistered();
        this.presentEmpService.changeList(empList);
        console.log('present emplist', this.empList);
        this.allDepartmentList = this.getAllDepartmentList(this.empList);
        this.allLocationList = this.getAllLocationList(this.empList);
        this.allEmpIdList = this.getAllEmpIdList(this.empList);
        this.addRegisteredPhotoToPresentEmpList(this.empList);
        this.markPresentEmployees();
      });
    });
  }

  private presencePercentage(empList) {
    if ( empList ) {
      this.presentEmp = ((empList.length / this.TOTAL_EMP) * 100).toFixed(2);
    } else {
      this.presentEmp = '00.00';
    }
  }

  private checkEmpIsRegistered(id) {
     return this.registeredUsersData.find((reg) => reg.id === id );
  }

  private checkEmpAlreadyPresent(newId) {
    if ( this.allEmpIdList ) {
      return this.allEmpIdList.includes(newId);
    } else {
      return false;
    }
  }

  private getAllEmpIdList(empList) {
    const locationList = empList.map(a => a.id);
    return [...new Set( locationList )];
  }

  private getAllLocationList(empList) {
    const locationList = empList.map(a => a.location);
    return [...new Set( locationList )].map((d) => {
      return {id: d };
    });
  }

  private getAllDepartmentList(empList) {
    const departmentList = empList.map(a => Utils.getFirstLaterOfWordCapital(a.department));
    return  [...new Set( departmentList)].map((d) => {
      return  {id: d };
    });
  }

  private addRegisteredPhotoToPresentEmpList(empList) {
    if (!this.registeredUsersData || !this.registeredUsersData.length ) { return; }
    // console.log('addregister before ', this.empList);
    this.empList = empList.map(emp => ({
      // tslint:disable-next-line:max-line-length
      ...emp , registeredPhoto: ( this.registeredUsersData.find(user => user.id === emp.id) ? this.registeredUsersData.find(user => user.id === emp.id).photos : '')
    }));
    // console.log('addregister', this.empList);
  }

  private markPresentEmployees() {
    if (!this.registeredUsersData || !this.empList) {
      console.log('185');
      return [];
    }
    this.dataSource.data = this.registeredUsersData.map(user => ({
      ...user , isPresent: !isNullOrUndefined( this.empList.find(emp => {
        return emp.id === user.id;
      }))
    }));
  }

  getPresentEmployeesDetails(startTime, endTime, callBackFn = null) {
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
    if ( response.msg === 'Un-Authorized Access, expired session' ) {
      this.auth.logOut();
    }
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
      this.errorToaster(response.msg);
      console.log('no registered users data found');
      return [];
    }

    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, department: null, photo: null, photos: [], id: 0};

      row.name = element.awi_label;
      row.department = element.awi_subclass;
      const image = element.imgs[0];
      const images = element.imgs;
      row.photo = this.getUpdatedImageUrl(image);
      images.forEach( (img) => {
        row.photos.push(this.getUpdatedImageUrl(img));
      });
      row.id = element.id;

      data.push(row);
    });
    return data;
  }
  private extractData(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
      this.errorToaster(response.msg);
      // this.presentEmp = '00.00';
      return [];
    }

    // this.presentEmp = ((response.data.length / this.TOTAL_EMP) * 100).toFixed(2);
    this.successToaster(response.msg);
    const data = [];
    response.data.forEach((element) => {
      // tslint:disable-next-line:max-line-length
      const row = {name: null, inTime: null, inTimeForCSV: null, outTime: null, location: null, department: null, photo: null, id: 0, type: null};

      const dynamicKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
      const intime = element.first_presence;
      const outtime = element.last_presence;
      row.name = element.awi_label;
      row.inTime = intime;

      row.inTimeForCSV =  Utils.getFormattedTime(intime);
      row.outTime = Utils.getFormattedTime(outtime);
      row.location = element.awi_data.location;
      row.type = element.type;

      row.department = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

      row.id = element.awi_data.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

      const img = element.awi_data.awi_app_data.awi_blobs[dynamicKey].img_base64;
      row.photo = this.getUpdatedImageUrl(img);
      if ( this.checkEmpIsRegistered(row.id) ) {
        data.push(row);
      }
    });
    return data;
  }

  private extractDataForNewEmp(res) {

    // tslint:disable-next-line:max-line-length
    const row = {name: null, inTime: null, outTime: null, inTimeForCSV: null, type: null, location: null, department: null , photo: null,  id: 0};
    const dynamicKey = res.data.awi_facial_recognition.awi_app_data.awi_blobs.awi_blob_ids[0];
    const intime = res.data.timestamp;
    const outtime = res.data.timestamp;

    row.department = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_subclass;

    row.inTime = intime;
    row.inTimeForCSV =  Utils.getFormattedTime(intime);
    row.outTime = Utils.getFormattedTime(outtime);
    row.location = res.data.awi_facial_recognition.location;
    row.type = 'auto';

    row.name = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_label;

    row.id = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;

    const img = res.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].img_base64;
    row.photo = this.getUpdatedImageUrl(img);

      if (row.name !== 'Unrecognized') {
        return row;
      } else {
        console.log('unrecognized person');
      }
      // return row;
  }

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
      const empList = this.extractData(response);
      this.presencePercentage(empList);
      this.presentEmpService.changeList(empList);
      this.addRegisteredPhotoToPresentEmpList(this.empList);
      this.markPresentEmployees();
    });
  }

  absent() {
    this.selectedTab = 'A';
    this.selectedDate = null;
    console.log(this.selectedDate);
    this.markPresentEmployees();
    // console.log('yes div 2 as btn');
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  empData(element) {
    console.log('selectedempdata', element);
    this.selectedEmpData = element;
  }

  chooseEndDateTime() {
    if ( this.selectedDate ) {
      if ( Utils.getStartTimeStampOfGivenDate(this.todaysDate) === Utils.getStartTimeStampOfGivenDate(this.selectedDate) ) {
        return Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );
      } else {
        return Utils.getEndTimeStampOfGivenDate( this.selectedDate );
      }
    } else {
      return Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );
    }
  }
  chooseStartDateTime() {
    if ( !this.selectedDate ) {
     return Utils.getStartTimeStampOfGivenDate(this.todaysDate);
    } else {
      return Utils.getStartTimeStampOfGivenDate(this.selectedDate);
    }
  }

  rejectEmployeeAttendance() {
    console.log('reject attendace' , this.selectedDate );
    const startTime = this.chooseStartDateTime();
    const endTime = this.chooseEndDateTime();

    if ( this.checkEmpAlreadyPresent(this.selectedEmpData.id) ) {
      this.apiService.rejectEmpAttendance({'start_time': startTime, 'end_time': endTime, 'awi_label': this.selectedEmpData.name})
      .subscribe(
        response => {
          console.log('rejectDatarespone' , response);
          if ( response.success ) {
            this.successToaster(response.msg);

            // this.getPresentEmployeesDetails(this.startTimeStamp, this.endTimeStamp, (res) => {
            //   console.log('presentempdeta');
            //   this.empList = this.extractData(res);
            //   this.allEmpIdList = this.getAllEmpIdList(this.empList);
            //   this.addRegisteredPhotoToPresentEmpList(this.empList);
            //   this.markPresentEmployees();
            //   console.log('this.empList', this.empList);
            // });
            this.presentEmpService.reject(this.selectedEmpData.id);
            this.markPresentEmployees();
            this.allEmpIdList = this.getAllEmpIdList(this.empList);

          } else {
            this.errorToaster(response.msg);
          }
        }
      );
    } else {
      this.errorToaster('already absent!');
    }

  }

  deleteUser() {
    console.log('delete user');
  }

  searchEmployee(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  enableExportButton(yearlyReport) {
    this.disableExportButton = false;
    console.log('enableExportButton:', yearlyReport);
    this.yearlyReport = yearlyReport;
  }

  checkDataMonthlyOrYearly(dataType) {
    this.fileDataType = dataType;
    console.log('file type', this.fileDataType);
  }

  employeeMonthlyReportData(monthlyData) {
    this.monthlyData = monthlyData;
    console.log('monthName', this.monthlyData);
  }

  selectedYearForEmp(year) {
    console.log('year', year);
    this.selectedYear = year;
  }

  exportEmployeeMonthReport(fileName) {
    const empName = Utils.getFirstLaterOfWordCapital(fileName);
    const CSVfilename = empName + '_' + this.monthlyData.month + '_' + this.monthlyData.year.year + '_Attendance_Record';
    console.log('export monthly');
    this.exportAsService.save(this.exportAsConfig, CSVfilename).subscribe(() => {
    });
  }

  exportEmployeeYearReport(fileName) {
    console.log('export yearly');
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      // title: 'Today\'s Present Employee',
      title: '',
      useTextFile: false,
      useBom: true,
      filename: null,
      useKeysAsHeaders: true,
    };
    const empName = Utils.getFirstLaterOfWordCapital(fileName);
    options.filename = empName + '_' + this.selectedYear.year + '_Yearly_Attendance';
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.yearlyReport);
  }

  getEmployeeRecordForSelectedDate(selectedDate) {
    // console.log('selectedDate', selectedDate);
    this.selectedDate = selectedDate;
    this.startTimeStamp = Utils.getStartTimeStampOfGivenDate(selectedDate);
    this.endTimeStamp = Utils.getEndTimeStampOfGivenDate(selectedDate);
    this.getPresentEmployeesDetails(this.startTimeStamp, this.endTimeStamp, (res) => {
      const empList = this.extractData(res);
      console.log('selected date data', empList);
      this.presencePercentage(empList);
      this.presentEmpService.changeList(empList);
      this.allEmpIdList = this.getAllEmpIdList(this.empList);
      this.addRegisteredPhotoToPresentEmpList(this.empList);
      this.markPresentEmployees();
      console.log('this.empList', this.empList);
    });
  }
}

