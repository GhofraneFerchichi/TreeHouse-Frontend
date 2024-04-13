import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFournitureComponent } from './navbar-fourniture.component';

describe('NavbarFournitureComponent', () => {
  let component: NavbarFournitureComponent;
  let fixture: ComponentFixture<NavbarFournitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarFournitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
