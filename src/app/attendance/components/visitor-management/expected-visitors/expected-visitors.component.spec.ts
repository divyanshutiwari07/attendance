import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedVisitorsComponent } from './expected-visitors.component';

describe('ExpectedVisitorsComponent', () => {
  let component: ExpectedVisitorsComponent;
  let fixture: ComponentFixture<ExpectedVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
