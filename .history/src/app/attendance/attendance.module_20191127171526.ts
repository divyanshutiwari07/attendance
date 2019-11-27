import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpRowComponent } from './components/emp-list/emp-row/emp-row.component';

// import { SidebarComponent } from '../components/sidebar/sidebar.component';
// import { HeaderComponent } from './components/header/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RegisterComponent } from './components/register/register.component';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {AttendanceComponent} from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceStatsComponent } from './components/attendance-stats/attendance-stats.component';
import {ngfModule} from 'angular-file';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
import { YearlyReportComponent } from './components/yearly-report/yearly-report.component';


@NgModule({
  declarations: [
    TodaysReportComponent,
    EmpListComponent,
    EmpRowComponent,
    RegisterComponent,
    SidebarComponent,
    HeaderComponent,
    AttendanceComponent,
    AttendanceStatsComponent,
    MonthlyReportComponent,
    YearlyReportComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule.forRoot(),
    TranslateModule,
    FormsModule,
    ngfModule,
    ReactiveFormsModule
  ],
  bootstrap: [AttendanceComponent],
  entryComponents: [RegisterComponent],
  providers: [ ],
})
export class AttendanceModule { }
