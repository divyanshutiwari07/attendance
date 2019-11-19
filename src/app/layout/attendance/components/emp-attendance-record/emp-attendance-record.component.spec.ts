import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAttendanceRecordComponent } from './emp-attendance-record.component';

describe('EmpAttendanceRecordComponent', () => {
  let component: EmpAttendanceRecordComponent;
  let fixture: ComponentFixture<EmpAttendanceRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAttendanceRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
