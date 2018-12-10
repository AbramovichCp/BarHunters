import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdminPanelComponent } from './sidebar-admin-panel.component';

describe('SidebarAdminPanelComponent', () => {
  let component: SidebarAdminPanelComponent;
  let fixture: ComponentFixture<SidebarAdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarAdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
