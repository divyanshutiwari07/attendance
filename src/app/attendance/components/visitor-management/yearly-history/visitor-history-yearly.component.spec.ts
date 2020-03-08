import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorHistoryYearlyComponent } from './visitor-history-yearly.component';

describe('VisitorHistoryYearlyComponent', () => {
  let component: VisitorHistoryYearlyComponent;
  let fixture: ComponentFixture<VisitorHistoryYearlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorHistoryYearlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorHistoryYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
