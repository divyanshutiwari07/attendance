import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrecognizedVisitorsComponent } from './unrecognized-visitors.component';

describe('UnrecognizedVisitorsComponent', () => {
  let component: UnrecognizedVisitorsComponent;
  let fixture: ComponentFixture<UnrecognizedVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnrecognizedVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnrecognizedVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
