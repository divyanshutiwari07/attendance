import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnChanges {

  @Input() employees: Array<object>;

  constructor() { }

  ngOnChanges() {    
    console.log(this.employees);
  }

}
