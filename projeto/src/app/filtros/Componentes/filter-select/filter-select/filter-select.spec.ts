import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSelect } from './filter-select';

describe('FilterSelect', () => {
  let component: FilterSelect;
  let fixture: ComponentFixture<FilterSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
