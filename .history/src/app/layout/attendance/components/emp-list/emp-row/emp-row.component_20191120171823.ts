import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-emp-row',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: {}

  constructor() { }

  ngOnInit() {
    console.log(this.employee);
  }

}
