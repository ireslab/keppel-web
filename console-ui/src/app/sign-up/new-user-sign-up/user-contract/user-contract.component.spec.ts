import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContractComponent } from './user-contract.component';

describe('UserContractComponent', () => {
  let component: UserContractComponent;
  let fixture: ComponentFixture<UserContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
