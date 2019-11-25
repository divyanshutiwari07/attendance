import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';

import { ngfModule, ngf } from 'angular-file'
import { Subscription } from 'rxjs';
import { HttpRequest } from '@angular/common/http';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    register: any = {};
    modalReference = null;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        public router: Router ,
        private modalService: NgbModal,
        private notifyService: NotificationService
        ) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    // rltAndLtr() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle('rtl');
    // }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }

    // onLoggedout() {
    //     localStorage.removeItem('isLoggedin');
    // }


    openVerticallyCentered(content) {
        this.modalReference =  this.modalService.open(content, { centered: true });
  }

  registerUser() {
      console.log(this.register);
  }
 
//   uploadFiles(files:File[]) {
//     console.log("Files: ", files);
//     console.log("Gonna upload");
//   }

  onSubmit() {
    console.log(this.register);
    // this.modalReference.close();
    this.successToaster();
  }

  successToaster() {
    this.notifyService.showSuccess('New Register Object is saved !!',  'Register Object');
  }

}
