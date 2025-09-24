import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorAnoIntervalo } from './seletor-ano-intervalo';

describe('SeletorAnoIntervalo', () => {
  let component: SeletorAnoIntervalo;
  let fixture: ComponentFixture<SeletorAnoIntervalo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeletorAnoIntervalo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeletorAnoIntervalo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
