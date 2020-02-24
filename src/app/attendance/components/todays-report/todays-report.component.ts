import { Component, OnInit, ViewChild  } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { PresentEmpService } from '../../services/present-emp.service';
import { UserDataHomePageService } from '../../services/user.data.home.page.service';
import { CameraSourceService } from '../../services/camera-source.service';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

import PresentEmployeeListModel from '../../models/present-employee-list-model';
import PresentNewEmployeeModel from '../../models/present-new-employee-model';

import { isNullOrUndefined } from 'util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource, MatPaginator , MatSort} from '@angular/material';
import { config } from '../../../config';
import { ExportToCsv } from 'export-to-csv';
import * as Utils from '../../common/utils';

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

  private startTime;
  private endTime;
  private yearlyReport;
  private startTimeStamp;
  private endTimeStamp;
  private allEmpIdList;
  private monthlyData;
  private selectedYear;
  private selectedDate;
  private selectedCamera;
  private presentEmpSubscription;

  public empList = [];
  public searchedList = [];
  public selectedTab;
  public TOTAL_EMP;
  public presentEmp;
  public message: string;
  public registeredUsersData;
  public selectedEmpData;
  public disableExportButton;
  public todaysDate;
  public allDepartmentList;
  public allLocationList;
  public searchText;
  public fileDataType;

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
    private presentEmpService: PresentEmpService,
    private cameraSourceService: CameraSourceService,
  ) {}

  ngOnInit() {
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
      });

    this.cameraSourceService.currentCameraSource.subscribe( selectedCamera => {
      console.log('todays component ', selectedCamera);
      this.selectedCamera = selectedCamera;
    } );
  }

  private startSocketConnection() {
    this.userData.initConnection('Access Real Time Data from server');
  }

  private checkNewPresentEmp() {
    this.userData.messages.subscribe(data => {
      console.log('Data' , data);
      const newEmpData = this.extractDataForNewEmp(data);
      console.log('newData' , newEmpData);
      if ( newEmpData ) {
        if ( !this.checkEmpAlreadyPresent( newEmpData.id ) ) {
          if ( this.checkCamIdMatched(newEmpData.camId) && this.checkEmpIsRegistered(newEmpData.id) ) {
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
          console.log('emp already present');
        }
      }
    });
  }

  private getListOfRegisteredUsers() {
    this.userService.loadRegisterUsers().subscribe(response => {

      this.registeredUsersData = this.extractDataForRegisteredUsers(response);
      console.log('register data', this.registeredUsersData);
      this.TOTAL_EMP = response.count;

      this.getPresentEmployeesDetails(this.startTime, this.endTime, (res) => {
        const empList = this.extractData(res);
        this.presencePercentage(empList);
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

  private checkEmpIsRegistered(id) {
     return this.registeredUsersData.find((reg) => reg.id === id );
  }

  private checkCamIdMatched( camId ) {
    if ( this.selectedCamera === camId ) {
      return true;
    }
  }

  private checkEmpAlreadyPresent(newId) {
    if ( this.allEmpIdList ) {
      return this.allEmpIdList.includes(newId);
    } else {
      return false;
    }
  }

  private presencePercentage(empList) {
    if ( empList && empList.length > 0 ) {
      this.presentEmp = ((empList.length / this.TOTAL_EMP) * 100).toFixed(2);
    } else {
      this.presentEmp = '00.00';
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
    this.empList = empList.map(emp => ({
      // tslint:disable-next-line:max-line-length
      ...emp , registeredPhoto: ( this.registeredUsersData.find(user => user.id === emp.id) ? this.registeredUsersData.find(user => user.id === emp.id).photos : '')
    }));
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

  searchEmployee(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPresentEmployeesDetails(startTime, endTime, callBackFn = null) {
    this.presentEmpService.loadPresentEmployees({'start_time': startTime, 'end_time': endTime }).subscribe(res => {
      if (callBackFn) {
        callBackFn(res);
      }
    });
  }

  private extractDataForRegisteredUsers(response): Array<object> {
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

    const empListObj = PresentEmployeeListModel.ModelMap(response);
    const data = empListObj.presentEmployeeList;
    return data;
  }

  private extractDataForNewEmp(res) {
    const newPerson = PresentNewEmployeeModel.ModelMap(res).presentEmployee;
      if (newPerson.name !== 'Unrecognized') {
        return newPerson;
      } else {
        console.log('unrecognized person');
      }
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
    this.markPresentEmployees();
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
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
            //   console.log('presentata');
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

  editUserDetails() {
    // console.log('edit user details');
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

  checkDataMonthlyOrYearly(dataType) {
    this.fileDataType = dataType;
    console.log('file type', this.fileDataType);
  }

  employeeMonthlyReportData(monthlyData) {
    this.monthlyData = monthlyData;
    console.log('monthName', this.monthlyData);
  }

  selectedYearForEmp(year) {
    this.selectedYear = year;
  }

  exportEmployeeMonthReport(fileName) {
    const empName = Utils.getFirstLaterOfWordCapital(fileName);
    const CSVfilename = empName + '_' + this.monthlyData.month + '_' + this.monthlyData.year.year + '_Attendance_Record';
    this.exportAsService.save(this.exportAsConfig, CSVfilename).subscribe(() => {
    });
  }

  exportEmployeeYearReport(fileName) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
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
    this.selectedDate = selectedDate;
    this.startTimeStamp = Utils.getStartTimeStampOfGivenDate(selectedDate);
    this.endTimeStamp = Utils.getEndTimeStampOfGivenDate(selectedDate);
    this.getPresentEmployeesDetails(this.startTimeStamp, this.endTimeStamp, (res) => {
      const empList = this.extractData(res);
      this.presencePercentage(empList);
      this.presentEmpService.changeList(empList);
      this.allEmpIdList = this.getAllEmpIdList(this.empList);
      this.addRegisteredPhotoToPresentEmpList(this.empList);
      this.markPresentEmployees();
    });
  }
}

