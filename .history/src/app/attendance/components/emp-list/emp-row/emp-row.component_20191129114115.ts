import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../services/api.service';
import { isNullOrUndefined } from 'util';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: any = {};
  getMonthFirstDayStartTime: any;
  getMonthLastDayEndTime: any;
  public empRecord = {};

  constructor(private modalService: NgbModal, private apiService: ApiService) { }

  ngOnInit() {
    //  first and last day of current year
    const getYearFirstDay = new Date(new Date().getFullYear(), 0, 1 );
    const getYearLastDay = new Date(new Date().getFullYear(), 11, 31);
    const getYearFirstDayStartTime = getYearFirstDay.setHours(0, 0, 0, 0);
    const getYearLastDayEndTime = getYearLastDay.setHours(23, 59, 59, 999);

    // first and last day of current month

    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const getMonthFirstDay = new Date(y, m, 1);
    const getMonthLastDay = new Date(y, m + 1, 0);
    this.getMonthFirstDayStartTime = getMonthFirstDay.setHours(0, 0, 0, 0);
    this.getMonthLastDayEndTime = getMonthLastDay.setHours(23, 59, 59, 999);

  }

  openVerticallyCentered(content) {
    // tslint:disable-next-line:max-line-length
    this.apiService.getPresentEmployeesForDate({'start_time': this.getMonthFirstDayStartTime, 'end_time': this.getMonthLastDayEndTime, 'awi_label': this.employee.name })
    .subscribe((response) => this.empRecord = this.extractData(response));

    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

  private extractData(response): Array<object> {
    if (isNullOrUndefined(response) || isNullOrUndefined(response.data)) {
      alert('No data found');
      console.log('todays data not found');
      return [];
    }

    const data = [];
    response.data.forEach((element) => {
      const row = {inTime: null, outTime: null, photo: null, name: null, id: 0};

      row.inTime = element.first_presence;
      row.outTime = element.last_presence;
      row.name = element.awi_label;

      // Hard code emp Id
      // row.id = 123 + key;

      const imgKey = element.awi_data.awi_app_data.awi_blobs.awi_blob_ids[0];
      row.photo = element.awi_data.awi_app_data.awi_blobs[imgKey].img_base64;
      // row.photo = 'https://www.tutorialrepublic.com/examples/images/avatar/1.jpg';

      data.push(row);
    });
    console.log(response);
    return data;
  }

}

