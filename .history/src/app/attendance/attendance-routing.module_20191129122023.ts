import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guard/auth.guard';

import { TodaysReportComponent } from './components/todays-report/todays-report.component';
import { AttendanceComponent } from './attendance.component';
import { AttendanceStatsComponent } from './components/attendance-stats/attendance-stats.component';

const routes: Routes = [
    {
      path: '',
      component: AttendanceComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'todays-report' },
        { path: 'todays-report', component: TodaysReportComponent},
        { path: 'attendance-stats', component: AttendanceStatsComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }