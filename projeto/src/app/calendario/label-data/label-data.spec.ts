import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelData } from './label-data';

describe('LabelData', () => {
  let component: LabelData;
  let fixture: ComponentFixture<LabelData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
