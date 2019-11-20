import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpAttendanceRecordComponent } from './components/emp-attendance-record/emp-attendance-record.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpRowComponent } from './components/emp-list/emp-row/emp-row.component';
import { EmpDetailModalComponent } from './components/emp-detail-modal/emp-detail-modal.component';

// import { SidebarComponent } from '../components/sidebar/sidebar.component';
// import { HeaderComponent } from './components/header/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlxUiDatatableModule, FlxUiDataTable } from 'flx-ui-datatable';
import { RegisterComponent } from './components/register/register.component';



@NgModule({
  declarations: [
    TodaysReportComponent,
    EmpAttendanceRecordComponent,
    EmpListComponent,
    EmpRowComponent,
    EmpDetailModalComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule,
    FlxUiDatatableModule
  ],
  providers: [ FlxUiDataTable],
})
export class AttendanceModule { }
