import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumEventsComponent } from './premium-events.component';

describe('PremiumEventsComponent', () => {
  let component: PremiumEventsComponent;
  let fixture: ComponentFixture<PremiumEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumEventsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
