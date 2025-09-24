import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataIntervalo } from './data-intervalo';

describe('DataIntervalo', () => {
  let component: DataIntervalo;
  let fixture: ComponentFixture<DataIntervalo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataIntervalo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataIntervalo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
