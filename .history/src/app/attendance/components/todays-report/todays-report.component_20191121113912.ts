import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // const empData = this.apiService.getPresentEmployeesForDate();
    
  }

}
