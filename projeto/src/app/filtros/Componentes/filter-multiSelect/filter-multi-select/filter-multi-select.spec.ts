import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMultiSelect } from './filter-multi-select';

describe('FilterMultiSelect', () => {
  let component: FilterMultiSelect;
  let fixture: ComponentFixture<FilterMultiSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterMultiSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterMultiSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
