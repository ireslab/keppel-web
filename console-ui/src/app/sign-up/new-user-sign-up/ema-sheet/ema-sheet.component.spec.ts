import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaSheetComponent } from './ema-sheet.component';

describe('EmaSheetComponent', () => {
  let component: EmaSheetComponent;
  let fixture: ComponentFixture<EmaSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
