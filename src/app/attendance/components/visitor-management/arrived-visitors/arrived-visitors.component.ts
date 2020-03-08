import { Component, OnInit } from '@angular/core';
import {VisitorService} from '../../../services/visitor.service';

@Component({
  selector: 'app-arrived-visitors',
  templateUrl: './arrived-visitors.component.html',
  styleUrls: ['./arrived-visitors.component.scss']
})
export class ArrivedVisitorsComponent implements OnInit {

  visitorList: [];

  constructor(private visitorService: VisitorService) { }

  ngOnInit() {
    this.visitorService.loadArrivedVisitors({}).subscribe(visitors => {
      this.visitorList = visitors;
      console.log(visitors);
    });
  }

}
