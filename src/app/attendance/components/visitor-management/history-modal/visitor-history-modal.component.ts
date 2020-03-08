import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-visitor-history-modal',
  templateUrl: './visitor-history-modal.component.html',
  styleUrls: ['./visitor-history-modal.component.scss']
})
export class VisitorHistoryModalComponent implements OnInit {
  @Input() visitor: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
