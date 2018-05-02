import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackApplicationStatusComponent } from './track-application-status.component';

describe('TrackApplicationStatusComponent', () => {
  let component: TrackApplicationStatusComponent;
  let fixture: ComponentFixture<TrackApplicationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackApplicationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
