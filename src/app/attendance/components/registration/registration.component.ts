import { Component, OnInit, EventEmitter, Output, Input, ViewChild, TemplateRef, AfterViewInit, HostBinding } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  @Input() registeredUser;
  isEditMode:boolean = false;

  modalReference = null;
  registerForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  severityOption: Array<object> = [ {id: 'critical', value: 'awi_critical'}, {id: 'high', value : 'awi_high'}, {id: 'medium', value : 'awi_medium'}, {id: 'low', value : 'awi_low'}];

  subClass: FormControl;
  label: FormControl;
  public registerFormSubmitted;
  public files;
  public showCameraView;

  public webcamImages: any = [];

  async handleImage(webcamImage: WebcamImage) {
      this.convertSrcToBlob(webcamImage.imageAsDataUrl)
      .then(blob => {
        const blobImage = blob;
        this.webcamImages.push({blob: blobImage, original: webcamImage});
    });;
  }

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private notifyService: NotificationService,
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.createFormControls();
    this.createForm();
    
    this.registerFormSubmitted = false;
   }

  ngOnInit() {
    this.showCameraView = false;
    console.log(this.registeredUser);
    // this.getModalContentRef.emit(this.contentTpl);
    if( this.registeredUser ) {
      this.isEditMode = true;
      this.files = [];
      this.registeredUser.photos.forEach(photoSrc => {
        this.convertSrcToBlob("https://i2.wp.com/airlinkflight.org/wp-content/uploads/2019/02/male-placeholder-image.jpeg?ssl=1").then(blob => {
          this.files.push(blob);
          console.log(this.files);
        });
      });
      this.registerForm.patchValue({
        label: this.registeredUser.name,
        subClass: this.registeredUser.department
      });
      
      // this.convertSrcToBlob()
    }
  }

  ngAfterViewInit() {
    
  }

  createFormControls() {
    this.label = new FormControl('', Validators.required);
    this.subClass = new FormControl('', Validators.required);
    // this.severity = new FormControl('', Validators.required);
  }

  createForm() {
      this.registerForm = new FormGroup({
          label: this.label,
          subClass: this.subClass,
      });
  }

  private convertSrcToBlob(url) {
    return fetch(url).then(res => res.blob());
  }

  onSubmit() {
    // console.log(this.files, this.webcamImages);
    this.registerFormSubmitted = true;
    console.log("registerForm", this.registerForm);
    if (this.registerForm.valid ) {
        const formData = new FormData();
        formData.append('awi_label', this.registerForm.get('label').value);
        formData.append('awi_class', 'awi_face');
        formData.append('awi_severity', 'awi_low');
        formData.append('awi_subclass', this.registerForm.get('subClass').value);
        if (this.files) {
            this.files.reverse().forEach((file) => {
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

  successToaster(message: string) {
    this.notifyService.showSuccess(message, '');
  }

}
