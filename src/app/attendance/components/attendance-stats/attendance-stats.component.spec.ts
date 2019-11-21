import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStatsComponent } from './attendance-stats.component';

describe('AttendanceStatsComponent', () => {
  let component: AttendanceStatsComponent;
  let fixture: ComponentFixture<AttendanceStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
