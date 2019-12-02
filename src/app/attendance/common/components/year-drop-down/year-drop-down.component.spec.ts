import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearDropDownComponent } from './year-drop-down.component';

describe('YearDropDownComponent', () => {
  let component: YearDropDownComponent;
  let fixture: ComponentFixture<YearDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
