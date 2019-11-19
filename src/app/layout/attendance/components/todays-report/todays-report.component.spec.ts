import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysReportComponent } from './todays-report.component';

describe('TodaysReportComponent', () => {
  let component: TodaysReportComponent;
  let fixture: ComponentFixture<TodaysReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
