import { Component, OnInit , Input} from '@angular/core';
import { ApiService } from '../../services/api.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-todays-report',
  templateUrl: './todays-report.component.html',
  styleUrls: ['./todays-report.component.scss']
})
export class TodaysReportComponent implements OnInit {

  @Input() id: number;
  constructor(private apiService: ApiService , private modalService: NgbModal) { }

  ngOnInit() {
    // const empData = this.apiService.getPresentEmployeesForDate();

  }

  openFormModal() {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.componentInstance.id = 10;

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
