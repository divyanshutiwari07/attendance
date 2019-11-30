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

  constructor(private apiService: ApiService , private notifyService: NotificationService) { }

  ngOnInit() {
    // const startTime = Date.parse(new Date().toISOString().slice(0, 10));
    // const endTime = Date.parse(new Date().toISOString().slice(0, 10) + ' ' + '23:59:59');
    const startTime = new Date().setHours(0, 0, 0, 0);
    const endTime = new Date().setHours(23, 59, 59, 999);
    console.log(startTime);
    console.log(endTime);

    // this.apiService.getPresentEmployeesForDate({'start_time': startTime, 'end_time': endTime })
    // .subscribe(response => console.log(response));
    this.apiService.getPresentEmployeesForDate({'start_time': startTime, 'end_time': endTime })
    .subscribe(response => this.empList = this.extractData(response));
  }

  private extractData(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === 'false') {
      alert('No data found');
      console.log('todays data not found');
      return [];
    }
    // if ( response.success = 'false') {
    //   console.log('no data found today');
    // }
    const data = [];
    response.data.forEach((element) => {
      const row = {inTime: null, outTime: null, photo: null, name: null, id: 0};

      row.inTime = element.first_presence;
      row.outTime = element.last_presence;
      row.name = element.awi_label;

      // Hard code emp Id
      // row.id = 123 + key;

      // const imgKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
      // row.photo = element.awi_data.awi_app_data.awi_blobs[imgKey].img_base64;


      data.push(row);
    });
    console.log(response);
    return data;
  }
  // errorToaster() {
  //   this.notifyService.showError('Data Clear successfully !!',  'PoC');
  // }


}
