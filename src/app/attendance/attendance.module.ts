import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportAsModule } from 'ngx-export-as';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpRowComponent } from './components/emp-list/emp-row/emp-row.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {AttendanceComponent} from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceStatsComponent } from './components/attendance-stats/attendance-stats.component';
import {ngfModule} from 'angular-file';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
import { YearlyReportComponent } from './components/yearly-report/yearly-report.component';
import { YearDropDownComponent } from './common/components/year-drop-down/year-drop-down.component';

import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './common/material/material.module';


@NgModule({
  declarations: [
    TodaysReportComponent,
    EmpListComponent,
    EmpRowComponent,
    SidebarComponent,
    HeaderComponent,
    AttendanceComponent,
    AttendanceStatsComponent,
    MonthlyReportComponent,
    YearlyReportComponent,
    YearDropDownComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ngfModule,
    ReactiveFormsModule,
    ExportAsModule,
    DataTablesModule,
    MaterialModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  bootstrap: [AttendanceComponent],
  providers: [ ],
})
export class AttendanceModule { }
