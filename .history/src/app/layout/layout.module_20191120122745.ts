import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './attendance/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { AttendanceComponent } from './attendance/attendance.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,


    ],
    bootstrap: [LayoutComponent],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LayoutComponent, AttendanceComponent ],

})
export class LayoutModule {}
