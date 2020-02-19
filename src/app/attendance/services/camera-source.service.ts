import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable, Observer } from 'rxjs';
import { RestClient } from '../common/rest.client';
import { config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CameraSourceService {

  public cameraSource = {};

  private selectedCameraSource = new BehaviorSubject('default message');
  currentCameraSource = this.selectedCameraSource.asObservable();

  constructor( private http: RestClient ) {
  }

  changeCamera(selectedCamera: string) {
    this.selectedCameraSource.next(selectedCamera);
  }

  private storeCameraSource(response) {
    this.cameraSource = response;
  }

  public loadCameraSources(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.http.get(config.LIST_OF_SOURCES_URL, {}).subscribe(response => {
        this.storeCameraSource(response);
        observer.next(response);
        observer.complete();
      });
    });
  }

}



