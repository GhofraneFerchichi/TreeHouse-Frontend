import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRentComponent } from './navbar-rent.component';

describe('NavbarRentComponent', () => {
  let component: NavbarRentComponent;
  let fixture: ComponentFixture<NavbarRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
