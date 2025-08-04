import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioDialog } from './calendario-dialog';

describe('CalendarioDialog', () => {
  let component: CalendarioDialog;
  let fixture: ComponentFixture<CalendarioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
