import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

  employees: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.employees = [
      {name: 'Rohan', inTime: '10:20:AM', outTime: '07:20:PM'},
      {name: 'Suresh', inTime: '10:20:AM', outTime: '07:20:PM'},
      {name: 'Dhirendra', inTime: '10:20:AM', outTime: '07:20:PM'},
      {name: 'Rashmi', inTime: '10:20:AM', outTime: '07:20:PM'},
      {name: 'Mohani', inTime: '10:20:AM', outTime: '07:20:PM'},
      {name: 'Radha', inTime: '10:20:AM', outTime: '07:20:PM'},
    ];
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
