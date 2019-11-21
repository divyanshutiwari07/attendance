import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  registerDetails: any = {};
  constructor(public activeModal: NgbActiveModal) { }

  
  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
