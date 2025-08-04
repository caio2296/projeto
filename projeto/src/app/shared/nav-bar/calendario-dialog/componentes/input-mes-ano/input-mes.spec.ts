import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMes } from './input-mes';

describe('InputMes', () => {
  let component: InputMes;
  let fixture: ComponentFixture<InputMes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
