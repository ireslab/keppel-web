import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingConfirmationComponent } from './existing-confirmation.component';

describe('ExistingConfirmationComponent', () => {
  let component: ExistingConfirmationComponent;
  let fixture: ComponentFixture<ExistingConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
