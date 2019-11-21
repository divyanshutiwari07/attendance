import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpAttendanceRecordComponent } from './components/emp-attendance-record/emp-attendance-record.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpRowComponent } from './components/emp-list/emp-row/emp-row.component';
import { EmpDetailModalComponent } from './components/emp-detail-modal/emp-detail-modal.component';

// import { SidebarComponent } from '../components/sidebar/sidebar.component';
// import { HeaderComponent } from './components/header/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from './components/register/register.component';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {AttendanceComponent} from './attendance.component';
import { FormsModule } from '@angular/forms';
import { AttendanceStatsComponent } from './components/attendance-stats/attendance-stats.component';



@NgModule({
  declarations: [
    TodaysReportComponent,
    EmpAttendanceRecordComponent,
    EmpListComponent,
    EmpRowComponent,
    EmpDetailModalComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderComponent,
    AttendanceComponent,
    AttendanceStatsComponent,


  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule.forRoot(),
    TranslateModule,
    FormsModule
  ],
  bootstrap: [AttendanceComponent],
  entryComponents: [RegisterComponent],
  providers: [ ],
})
export class AttendanceModule { }
