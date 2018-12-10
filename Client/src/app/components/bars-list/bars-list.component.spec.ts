import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsListComponent } from './bars-list.component';

describe('BarsListComponent', () => {
  let component: BarsListComponent;
  let fixture: ComponentFixture<BarsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
