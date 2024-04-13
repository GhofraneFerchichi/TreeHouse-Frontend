import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournituresShopComponent } from './fournitures-shop.component';

describe('FournituresShopComponent', () => {
  let component: FournituresShopComponent;
  let fixture: ComponentFixture<FournituresShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournituresShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FournituresShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
