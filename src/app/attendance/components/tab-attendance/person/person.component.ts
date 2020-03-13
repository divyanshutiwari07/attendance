import { Component, OnInit } from '@angular/core';

import PresentEmployeeListModel from '../../../models/present-employee-list-model';
import PresentNewEmployeeModel from '../../../models/present-new-employee-model';

import { UserDataHomePageService } from '../../../services/user.data.home.page.service';
import { NotificationService } from '../../../services/notification.service';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { PresentEmpService } from '../../../services/present-emp.service';
import { CameraSourceService } from '../../../services/camera-source.service';

import { isNullOrUndefined } from 'util';
import { AuthGuard } from 'src/app/shared/guard';
import * as Utils from '../../../common/utils';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  private startTime: number;
  private endTime: number;
  private todaysDate;
  private selectedCamera;
  private presentEmpSubscription;

  public empListObj: PresentEmployeeListModel;
  public empIds;
  public empQueue = [];
  public getRegisteredUsersName: any = [];
  public newPersonCame;
  public empRecord: any = {};
  public person = {
    name: {
      name: '',
      id: 0
    },
    isRecognized: true,
  };

  constructor(
    private apiService: ApiService,
    private userData: UserDataHomePageService,
    private notifyService: NotificationService,
    private userService: UserService,
    private presentEmpService: PresentEmpService,
    private cameraSourceService: CameraSourceService,
    private auth: AuthGuard) {
      this.todaysDate = new Date();
    }


  ngOnInit() {
    this.startTime = new Date().setHours(0, 0, 0, 0);
    this.endTime = new Date().setHours(23, 59, 59, 999);

    this.startSocketConnection();
    this.initForm();
    this.checkNewRejectedEmp();
    this.checkNewUpdatedEmp();
    this.getPresentEmpData();
    this.getRegisterUsersData();

    this.cameraSourceService.currentCameraSource.subscribe( selectedCamera => {
      this.selectedCamera = selectedCamera;
    } );
  }

  private getRegisterUsersData() {
    this.userService.loadRegisterUsers().subscribe(response => {
      this.getRegisteredUsersName = this.getListOfRegisteredUsersDetails(response.data);
    });
  }

  private getListOfRegisteredUsersDetails(res) {
    if (isNullOrUndefined(res) || res.success === false) {
      return [];
    }
    return res.map((a) => {
      return  {name: a.awi_label, id: a.awi_id};
    });
  }

  private getPresentEmpData() {
    this.presentEmpService.loadPresentEmployees({start_time: this.startTime, end_time: this.endTime })
    .subscribe(
      response => {
        this.empListObj = PresentEmployeeListModel.ModelMap(response);
        this.empIds = this.empListObj.presentEmpIds;
        console.log('emp id on tab', this.empIds);
        this.presentEmpService.changeList(this.empListObj.presentEmployeeList);
        this.checkNewPresentEmp();
      }
    );
  }

  startSocketConnection() {
    this.userData.initConnection('Access Real Time Data from server');
  }

  private checkNewPresentEmp() {
    this.userData.messages.subscribe(data => {
      console.log('empid', this.empIds);
      const newPerson = PresentNewEmployeeModel.ModelMap(data).presentEmployee;
      const index = this.empQueue.findIndex((e) => e.id === newPerson.id);

      // tslint:disable-next-line:max-line-length
      if (index === -1 && newPerson.name !== 'Unrecognized' && newPerson.id !== this.empRecord.id && this.empIds.indexOf( newPerson.id ) === -1 ) {

          if ( this.checkCamIdMatched(newPerson.camId) && this.checkEmpIsRegistered(newPerson.id) ) {
            this.empQueue.push(newPerson);
          }
      } else {
          console.log('emp already present line 120');
      }
      console.log('Queue Status', this.empQueue);
      if ( !Object.keys(this.empRecord).length ) {
        this.showNextPersonInTheQueue();
      }
    }, (error) => {
      console.log('error', error);
      }
    );
  }

  private checkNewRejectedEmp() {
    this.userData.rejectMessages.subscribe(rejectedData => {
      this.removeIdFromTheList(rejectedData.data.id);
      this.removeEmpFromTheList(rejectedData.data.id);
      console.log('rejected data as real time on tab', rejectedData.data);
    });
  }

  private checkNewUpdatedEmp() {
    this.userData.detailsChangedMessages.subscribe(updatedEmpData => {
      console.log('updated datan  res', updatedEmpData);
      const dynamicKey = updatedEmpData.data.awi_facial_recognition.awi_app_data.awi_blobs.awi_blob_ids[0];
      // tslint:disable-next-line:max-line-length
      const updatedDataId = updatedEmpData.data.awi_facial_recognition.awi_app_data.awi_blobs[dynamicKey].classification.awi_blob_db[0].awi_id;
      console.log('updated data id', updatedDataId);
      this.addIdToTheList(updatedDataId);
      this.removeEmpFromTheList(updatedDataId);
    });
  }

  private checkEmpIsRegistered(id) {
    return this.getRegisteredUsersName.find((reg) => reg.id === id );
  }

  private checkCamIdMatched( camId ) {
    if ( this.selectedCamera === camId ) {
      return true;
    }
  }

  public onVerify() {
    // tslint:disable-next-line:max-line-length
    this.apiService.verifyEmployeePresence({id : this.empRecord.alertId, blob_id: this.empRecord.blobId, awi_label: this.empRecord.name, verify_user_event: true}).subscribe( response => {
      console.log('verify emp presence', response);
      if ( response.success === true ) {
        this.successToaster(response.msg);
        this.addIdToTheList(this.empRecord.id);
        // this.initForm();
        // this.showNextPersonInTheQueue();
      } else {
        this.errorToaster(response.msg);
      }
    });
  }

  public onSubmit() {
    console.log('person', this.person.name);

    if ( this.person.name.name ) {
      if ( this.checkEmpAlreadyPresent(this.person.name.id ) ) {
        this.successToaster(this.person.name.name + ' Already Present!');
      } else {
        // tslint:disable-next-line:max-line-length
        this.apiService.verifyEmployeePresence({id : this.empRecord.alertId, blob_id: this.empRecord.blobId, awi_label: this.person.name.name, updated_id: this.person.name.id}).subscribe( response => {
          console.log('verify emp presence', response);
          if ( response.success === true ) {
            this.successToaster(response.msg);
            this.addIdToTheList(this.person.name.id);
            this.initForm();
            this.showNextPersonInTheQueue();
          } else {
            this.errorToaster(response.msg);
          }
        });
      }
    } else {
      this.infoToaster('Select Your Name');
    }
  }

  public rejectDetection() {
    // console.log('emp', this.empRecord);
    const startTime = Utils.getStartTimeStampOfGivenDate(this.todaysDate);
    const endTime = Utils.getCurrentTimeStampOfGivenDate( this.todaysDate );
    this.apiService.rejectEmpAttendance({start_time: startTime, end_time: endTime, awi_label: this.empRecord.name, id: this.empRecord.id})
      .subscribe(
        response => {
          console.log('rejectDatarespone' , response);
          if ( response.success ) {
            this.successToaster(response.msg);
            // this.initForm();
            // this.showNextPersonInTheQueue();
          } else {
            this.errorToaster(response.msg);
          }
        }
      );
  }

  private addIdToTheList(newPersonId) {
    this.empIds.push(newPersonId);
    console.log('addIdToTheList called: new Emp Ids', this.empIds);
  }

  private removeIdFromTheList(newRejectedPerson) {
    this.empIds = this.empIds.filter(emp => emp.id !== newRejectedPerson.id);
    console.log('after rejected empids', this.empIds);
  }

  private removeEmpFromTheList(newRejectedPersonId) {
    console.log('empRecord', this.empRecord);
    console.log('emp queue', this.empQueue);
    if ( this.empRecord && this.empRecord.id === newRejectedPersonId ) {
      this.empRecord = {};
      // this.newPersonCame = false;

      console.log('empRecord after null before ', this.empRecord, this.empQueue);
      this.initForm();
      this.showNextPersonInTheQueue();
      console.log('empRecord after null after ', this.empRecord, this.empQueue);
    } else if ( this.empQueue ) {
      console.log( 'empqueue 239', this.empQueue);
      this.empQueue = this.empQueue.filter(empQ => empQ.id !== newRejectedPersonId);
      console.log( 'empqueue 241', this.empQueue);
      console.log('rejected emp from person list ');
    }
    // else {
    //   this.empQueue = this.empQueue.filter( (empQ) => {
    //     return empQ.id !== newRejectedPerson.id;
    //   });
    // }

  }

  private checkEmpAlreadyPresent(newId) {
    if ( this.empIds ) {
      return this.empIds.includes(newId);
    } else {
      return false;
    }
  }

  public showNextPersonInTheQueue() {
    this.empRecord = {};
    if ( !this.empQueue.length ) { return; }
    const newPerson = {...this.empQueue.shift()};
    if ( this.empIds.indexOf( newPerson.id ) === -1 ) {
      this.empRecord = newPerson;
      this.newPersonCame = true;
      console.log('newEmpRecord', this.empRecord);
    } else {
      this.showNextPersonInTheQueue();
    }
  }

  public initForm() {
      this.person = {
        name: {
          name: '',
          id: 0
        },
        isRecognized: true
      };
      this.newPersonCame = false;
  }

  successToaster(message: string) {
    this.notifyService.showSuccess(message,  '');
  }

  errorToaster(message: string) {
    this.notifyService.showError(message,  '');
  }

  infoToaster(message: string) {
    this.notifyService.showInfo(message,  '');
  }

}
