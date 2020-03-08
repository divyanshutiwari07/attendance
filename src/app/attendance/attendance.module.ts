import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportAsModule } from 'ngx-export-as';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { AttendanceRoutingModule } from './attendance-routing.module';

import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';
import { EmpRowComponent } from './components/emp-list/emp-row/emp-row.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {AttendanceComponent} from './attendance.component';
import { AttendanceStatsComponent } from './components/attendance-stats/attendance-stats.component';
import { MonthlyReportComponent } from './components/monthly-report/monthly-report.component';
import { YearlyReportComponent } from './components/yearly-report/yearly-report.component';
import { CameraComponent } from './components/camera/camera.component';
import { TabAttendanceComponent } from './components/tab-attendance/tab-attendance.component';
import { LiveStreamComponent } from './components/tab-attendance/live-stream/live-stream.component';
import { PersonComponent } from './components/tab-attendance/person/person.component';
import { TabHeaderComponent } from './components/tab-attendance/tab-header/tab-header.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ngfModule} from 'angular-file';
import { YearDropDownComponent } from './common/components/year-drop-down/year-drop-down.component';
import { MaterialModule } from './common/material/material.module';
import { SearchPipe } from './common/filters/search';
import { SortPipe } from './common/filters/sort';
import { TimeRangePipe } from './common/filters/time-range';
import { PresentEmpService } from './services/present-emp.service';

import {WebcamModule} from 'ngx-webcam';
import { RegistrationComponent } from './components/registration/registration.component';
import { HideIfNotDirective } from './directives/hide-if-not';
import { DisableIfNotDirective } from './directives/disable-if-not';
import { VisitorManagementComponent } from './components/visitor-management/visitor-management.component';


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
    TabAttendanceComponent,
    LiveStreamComponent,
    PersonComponent,
    TabHeaderComponent,
    CameraComponent,
    YearDropDownComponent,
    SearchPipe,
    SortPipe,
    TimeRangePipe,
    RegistrationComponent,
    HideIfNotDirective,
    DisableIfNotDirective,
    VisitorManagementComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ngfModule,
    ReactiveFormsModule,
    ExportAsModule,
    MaterialModule,
    WebcamModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  exports: [HideIfNotDirective, DisableIfNotDirective],
  bootstrap: [AttendanceComponent],
  providers: [SearchPipe, SortPipe, TimeRangePipe, PresentEmpService, NgbActiveModal],
  entryComponents: [RegistrationComponent]
})
export class AttendanceModule { }
