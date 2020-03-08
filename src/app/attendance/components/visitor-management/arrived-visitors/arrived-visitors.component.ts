import {Component, OnInit} from '@angular/core';
import {VisitorService} from '../../../services/visitor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VisitorHistoryModalComponent} from '../history-modal/visitor-history-modal.component';

@Component({
    selector: 'app-arrived-visitors',
    templateUrl: './arrived-visitors.component.html',
    styleUrls: ['./arrived-visitors.component.scss']
})
export class ArrivedVisitorsComponent implements OnInit {

    visitorList: any [];

    constructor(
        private visitorService: VisitorService,
        private modalService: NgbModal,
    ) {

    }

    ngOnInit() {
        this.visitorService.loadArrivedVisitors({}).subscribe((list) => {
            this.visitorList = list;
        });
    }

    viewHistory(visitor) {
        const modelRef = this.modalService.open(VisitorHistoryModalComponent, {centered: true, windowClass: 'modal-xl-custom'});
        modelRef.componentInstance.visitor = visitor;
    }

}
