import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRowComponent } from './emp-row.component';

describe('EmpRowComponent', () => {
  let component: EmpRowComponent;
  let fixture: ComponentFixture<EmpRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
