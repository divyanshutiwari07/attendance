import { Component, OnInit, ViewChild, ElementRef , AfterViewInit  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';
import { UserService } from '../../services/user.service';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }

// /** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, {static: false}) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, {static: false}) set paginator(sort: MatPaginator) {
    this.dataSource.paginator = sort;
  }
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  public empList = [];
  public selectedTab;
  public TOTAL_EMP;
  public presentEmp;
  public absentEmp;
  private startTime;
  private endTime;
  message: string;
  private registeredUsersData;


  constructor(
    private apiService: ApiService,
    private notifyService: NotificationService,
    private userService: UserService
  ) {
    //  // Create 100 users
    //  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    //  // Assign the data to the data source for the table to render
    //  this.dataSource = new MatTableDataSource(users);
   }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.selectedTab = 'P';

    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;

    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getListOfRegisteredUsers();
  }

  private getListOfRegisteredUsers() {
    this.userService.loadRegisterUsers().subscribe(response => {
      this.registeredUsersData = response.data;
      this.TOTAL_EMP = response.count;
      this.getPresentEmployeesDetails();
      console.log('register result', this.registeredUsersData);
      console.log('getListOfRegisteredUsers', response);
    });
  }

  private getPresentEmployeesDetails() {
    this.apiService.getPresentEmployeesForDate({'start_time': this.startTime, 'end_time': this.endTime })
    .subscribe(
      response => {
        this.empList = this.extractData(response);
      }
    );
  }

  private extractData(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
      this.errorToaster(response.msg);
      // console.log('todays data not found');
      return [];
    }

    this.presentEmp = ((response.data.length / this.TOTAL_EMP) * 100).toFixed(2);
    this.absentEmp = (((this.TOTAL_EMP - response.data.length) / this.TOTAL_EMP) * 100).toFixed(2);
    console.log('total emp', this.TOTAL_EMP);
    this.successToaster(response.msg);
    const data = [];
    response.data.forEach((element) => {
      const row = {name: null, inTime: null, outTime: null, photo: null, id: 0};

      row.name = element.awi_label;
      row.inTime = element.first_presence;
      row.outTime = element.last_presence;

      // Hard code emp Id
      // row.id = 123 + key;

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
    this.getPresentEmployeesDetails();
    // console.log('yes div 1 as btn');
  }

  absent() {
    this.selectedTab = 'A';
    // console.log('yes div 2 as btn');
  }

  check(row) {
    console.log(row);
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
