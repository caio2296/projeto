import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSeparator } from './filter-separator';

describe('FilterSeparator', () => {
  let component: FilterSeparator;
  let fixture: ComponentFixture<FilterSeparator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSeparator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSeparator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
