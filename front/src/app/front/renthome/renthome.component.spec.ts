import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenthomeComponent } from './renthome.component';

describe('RenthomeComponent', () => {
  let component: RenthomeComponent;
  let fixture: ComponentFixture<RenthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenthomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
