import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConditionsComponent } from './general-conditions.component';

describe('GeneralConditionsComponent', () => {
  let component: GeneralConditionsComponent;
  let fixture: ComponentFixture<GeneralConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
