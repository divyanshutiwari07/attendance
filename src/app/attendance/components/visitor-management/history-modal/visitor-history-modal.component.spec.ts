import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorHistoryModalComponent } from './visitor-history-modal.component';

describe('VisitorHistoryModalComponent', () => {
  let component: VisitorHistoryModalComponent;
  let fixture: ComponentFixture<VisitorHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
