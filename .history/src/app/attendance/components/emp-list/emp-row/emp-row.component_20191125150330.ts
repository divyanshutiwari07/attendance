import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: '[app-emp-row]',
  templateUrl: './emp-row.component.html',
  styleUrls: ['./emp-row.component.scss']
})
export class EmpRowComponent implements OnInit {

  @Input() employee: {};

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-xl-custom' });
  }

}