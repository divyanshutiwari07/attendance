import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDetailModalComponent } from './emp-detail-modal.component';

describe('EmpDetailModalComponent', () => {
  let component: EmpDetailModalComponent;
  let fixture: ComponentFixture<EmpDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
