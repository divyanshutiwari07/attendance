import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  constructor(private apiService: ApiService , private notifyService: NotificationService) { }

  ngOnInit() {
    

    // this.apiService.getPresentEmployeesForDate().subscribe(val => console.log(val));
    // const getjson = this.apiService.getPresentEmployeesForDate();
    // console.log(getjson);

    this.apiService.todaysAttendance({"start_time":1574188200000,"end_time":1574314498000 ,"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYXdpX2NsaWVudF9pZCI6MiwiYXdpcm9zIjoicGl5dXNoQGF3aWRpdC5jb20iLCJsZXZlbCI6ImF3aV91c2VyIiwiaWF0IjoxNTc0NDE1MzU1LCJleHAiOjE1NzQ1MDE3NTV9.uFkIrv3bK167iJncOI-xnKQQj7Kw3Wcwe3YpLftdM3w"}).subscribe(val => console.log(val));
  }

  successToaster() {
    console.log('yes');
    this.notifyService.showSuccess('Data Saved successfully !!',  'PoC Data');
  }

  errorToaster() {
    this.notifyService.showError('Data Clear successfully !!',  'PoC');
  }


}
