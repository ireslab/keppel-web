import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessContactDetailsComponent } from './business-contact-details.component';

describe('BusinessContactDetailsComponent', () => {
  let component: BusinessContactDetailsComponent;
  let fixture: ComponentFixture<BusinessContactDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessContactDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
