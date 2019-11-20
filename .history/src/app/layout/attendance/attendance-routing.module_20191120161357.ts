import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { EmpAttendanceRecordComponent } from './components/emp-attendance-record/emp-attendance-record.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todays-report' },
  { path: 'todays-report', component: TodaysReportComponent},
  { path: 'emp-attendance-record', component: EmpAttendanceRecordComponent },
  { path: 'register', component: EmpAttendanceRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
