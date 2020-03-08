import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {RestClient} from '../common/rest.client';
import {config} from '../../config';
import {isNullOrUndefined} from 'util';
import PresentEmployeeListModel from '../models/present-employee-list-model';
import VisitorListModel from '../models/visitor/visitor-list.model';

@Injectable({
    providedIn: 'root'
})
export class VisitorService {

    private arrivedVisitorSource = new BehaviorSubject([]);
    arrivedVisitorList$ = this.arrivedVisitorSource.asObservable();

    private expectedVisitorSource = new BehaviorSubject([]);
    expectedVisitorList$ = this.expectedVisitorSource.asObservable();

    constructor(private http: RestClient) {}

    public loadArrivedVisitors(req): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.http.get(config.ARRIVED_VISITORS, req).subscribe(response => {
                if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
                    return [];
                } else {
                    const visitorListObj = VisitorListModel.ModelMap(response);
                    observer.next(visitorListObj.getList());
                    this.changeArrivedList(visitorListObj.getList());
                }
                observer.complete();
            });
        });
    }

    public loadExpectedVisitors(req): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.http.get(config.EXPECTED_VISITORS, req).subscribe(response => {
                if (isNullOrUndefined(response) || isNullOrUndefined(response.data) || response.success === false) {
                    return [];
                } else {
                    observer.next(response);
                    this.changeExpectedList(response.data);
                }
                observer.complete();

            });
        });
    }

    changeArrivedList(newEmpList) {
        this.arrivedVisitorSource.next(newEmpList);
    }

    changeExpectedList(newEmpList) {
        this.expectedVisitorSource.next(newEmpList);
    }
}
