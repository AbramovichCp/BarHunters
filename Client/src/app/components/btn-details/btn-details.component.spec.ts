import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDetailsComponent } from './btn-details.component';

describe('BtnDetailsComponent', () => {
  let component: BtnDetailsComponent;
  let fixture: ComponentFixture<BtnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
