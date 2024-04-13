import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponents } from './forget-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponents;
  let fixture: ComponentFixture<ResetPasswordComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponents ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
