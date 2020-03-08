import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivedVisitorsComponent } from './arrived-visitors.component';

describe('ArrivedVisitorsComponent', () => {
  let component: ArrivedVisitorsComponent;
  let fixture: ComponentFixture<ArrivedVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivedVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivedVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
