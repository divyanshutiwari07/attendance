import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  public empList = [];
  public selectedTab;
  public TOTAL_EMP;
  public presentEmp;
  public absentEmp;
  private startTime;
  private endTime;

  constructor(private apiService: ApiService , private notifyService: NotificationService) { }

  ngOnInit() {
    this.TOTAL_EMP = 20;
    this.selectedTab = 'P';

    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.getPresentEmployeesDetails();
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
    this.presentEmp = (response.data.length / this.TOTAL_EMP) * 100;
    this.absentEmp = ((this.TOTAL_EMP - response.data.length) / this.TOTAL_EMP) * 100;

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
}
