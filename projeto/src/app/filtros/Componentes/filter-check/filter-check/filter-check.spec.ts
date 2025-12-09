import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCheck } from './filter-check';

describe('FilterCheck', () => {
  let component: FilterCheck;
  let fixture: ComponentFixture<FilterCheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterCheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterCheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
