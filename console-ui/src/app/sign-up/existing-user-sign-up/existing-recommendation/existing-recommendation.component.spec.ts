import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingRecommendationComponent } from './existing-recommendation.component';

describe('ExistingRecommendationComponent', () => {
  let component: ExistingRecommendationComponent;
  let fixture: ComponentFixture<ExistingRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingRecommendationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
