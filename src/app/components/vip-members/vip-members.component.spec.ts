import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipMembersComponent } from './vip-members.component';

describe('VipMembersComponent', () => {
  let component: VipMembersComponent;
  let fixture: ComponentFixture<VipMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VipMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VipMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
