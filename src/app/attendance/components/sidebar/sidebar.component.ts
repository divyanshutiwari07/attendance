import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
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
    // tslint:disable-next-line:max-line-length
    severityOption: Array<object> = [ {id: 'critical', value: 'awi_critical'}, {id: 'high', value : 'awi_high'}, {id: 'medium', value : 'awi_medium'}, {id: 'low', value : 'awi_low'}];

    subClass: FormControl;
    label: FormControl;
    // severity: FormControl;
    objectPhotos: FormControl;

    public registerFormSubmitted;
    public files;
    public showCameraView;

    @Output() collapsedEvent = new EventEmitter<boolean>();

    public webcamImages: any = [];

    async handleImage(webcamImage: WebcamImage) {
        await fetch(webcamImage.imageAsDataUrl)
            .then(res => res.blob())
            .then(blob => {
                const blobImage = blob;
                this.webcamImages.push({blob: blobImage, original: webcamImage});
            });
    }

    constructor(
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

        this.registerFormSubmitted = false;
    }

    createFormControls() {
        this.label = new FormControl('', Validators.required);
        this.subClass = new FormControl('', Validators.required);
        // this.severity = new FormControl('', Validators.required);
        this.objectPhotos = new FormControl('', Validators.required);
    }

    createForm() {
        this.registerForm = new FormGroup({
            label: this.label,
            subClass: this.subClass,
        });
    }

    ngOnInit() {
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.showCameraView = false;
        // tslint:disable-next-line:max-line-length
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
        this.modalReference = this.modalService.open(content, { centered: true });
        this.modalReference.result.then((data) => {
            this.resetModalData();
        }, (reason) => {
            this.resetModalData();
        });
    }
    

    onSubmit() {
    console.log(this.files, this.webcamImages);
    this.registerFormSubmitted = true;
    // console.log(this.registerForm);
    if (this.registerForm.valid ) {
        const formData = new FormData();
        formData.append('awi_label', this.registerForm.get('label').value);
        formData.append('awi_class', 'awi_face');
        formData.append('awi_severity', 'awi_low');
        formData.append('awi_subclass', this.registerForm.get('subClass').value);
        if (this.files) {
            this.files.forEach((file) => {
                formData.append('file', file);
            });
        }

        if (this.webcamImages.length) {
            this.webcamImages.forEach((image, key) => {
                formData.append('file', image.blob, 'webcam-' + (key + 1) + '.jpeg');
            });
        }

        // to see the structure of the formdata
        formData.forEach((value, key) => {
            console.log(key, ': ', value);
        });

        this.apiService.register(formData)
        .subscribe(
            response => {
                this.successToaster(response.msg);
                this.modalReference.close();
                console.log(response);
            }
        );
    }
  }

  successToaster(message: string) {
    this.notifyService.showSuccess(message, '');
  }

  toggleCamera() {
    this.showCameraView = !this.showCameraView;
  }

  resetModalData() {
    this.showCameraView = false ;
    this.webcamImages = [];
    this.registerForm.reset();
    // this.registerForm.markAsPristine();
    this.files = null;
  }
}
