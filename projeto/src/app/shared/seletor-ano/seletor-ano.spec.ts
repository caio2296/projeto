import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorAno } from './seletor-ano';

describe('SeletorAno', () => {
  let component: SeletorAno;
  let fixture: ComponentFixture<SeletorAno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeletorAno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeletorAno);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
