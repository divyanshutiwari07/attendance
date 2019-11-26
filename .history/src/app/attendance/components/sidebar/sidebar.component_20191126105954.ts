import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
    registerForm: FormGroup;

    subClass: FormControl;
    label: FormControl;
    severity: FormControl;
    objectPhotos: FormControl;

    private registerFormSubmitted;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService,
        public router: Router ,
        private modalService: NgbModal,
        private notifyService: NotificationService,
        private apiService: ApiService,
        private formBuilder: FormBuilder
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

        this.createFormControls();
        this.createForm();


        // this.registerForm = this.formBuilder.group({
        //     'label': [null, Validators.required],
        //     'subClass': [null, Validators.required],
        //     'severity': [null, Validators.required]
        // });

        this.registerFormSubmitted = false;
    }

    createFormControls() {
        console.log('pahuch gye');
        this.label = new FormControl('', Validators.required);
        this.subClass = new FormControl('', Validators.required);
        this.severity = new FormControl('', Validators.required);
        this.objectPhotos = new FormControl('', Validators.required);
    }

    createForm() {
        this.registerForm = new FormGroup({
            label: this.label,
            subClass: this.subClass,
            severity: this.severity,
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


    openVerticallyCentered(content) {
        this.modalReference =  this.modalService.open(content, { centered: true });
  }


//   uploadFiles(files:File[]) {
//     console.log("Files: ", files);
//     console.log("Gonna upload");
//   }

  onSubmit() {
        console.log(this.register, this.files);
      this.registerFormSubmitted = true;
    if (this.registerForm.valid) {
        const formData = new FormData();
        formData.append('label', this.registerForm.get('label').value);
        formData.append('severity', this.registerForm.get('severity').value);
        formData.append('subClass', this.registerForm.get('subClass').value);

        // this.files.forEach((file, key) => {
        //     formData.append('file_'+key, file);
        // });

        console.log(this.registerForm);
        console.log(formData);
        this.modalReference.close();
        this.successToaster();
        this.apiService.getPresentEmployeesForDate(this.register).subscribe(response => console.log(response));
    } else {

    }

  }

  isFieldValid(field: string) {
    return (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.registerFormSubmitted);
  }

  successToaster() {
    this.notifyService.showSuccess('New Register Object is saved !!',  'Register Object');
  }
  check() {
      console.log('worked');
  }
}
