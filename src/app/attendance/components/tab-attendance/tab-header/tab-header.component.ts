import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/shared/guard';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss']
})
export class TabHeaderComponent implements OnInit {

  constructor(private auth: AuthGuard) { }

  ngOnInit() {

  }

  onLoggedout() {
    this.auth.logOut();
  }

}
