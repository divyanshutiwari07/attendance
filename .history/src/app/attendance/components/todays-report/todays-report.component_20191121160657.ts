import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {

    // this.apiService.getPresentEmployeesForDate().subscribe(val => console.log(val));
    const getjson = this.apiService.getPresentEmployeesForDate();
    console.log(getjson);
  
    this.apiService.test({|email|:"ddsdsasa","password":"ddsa"}).subscribe(val => console.log(val)); 
  }

}
