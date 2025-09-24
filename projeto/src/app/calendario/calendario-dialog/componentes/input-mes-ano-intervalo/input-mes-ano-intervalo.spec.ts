import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMesAnoIntervalo } from './input-mes-ano-intervalo';


describe('InputMesAno', () => {
  let component: InputMesAnoIntervalo;
  let fixture: ComponentFixture<InputMesAnoIntervalo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMesAnoIntervalo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMesAnoIntervalo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
