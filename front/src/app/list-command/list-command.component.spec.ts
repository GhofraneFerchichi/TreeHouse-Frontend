import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandComponent } from './list-command.component';

describe('ListCommandComponent', () => {
  let component: ListCommandComponent;
  let fixture: ComponentFixture<ListCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
