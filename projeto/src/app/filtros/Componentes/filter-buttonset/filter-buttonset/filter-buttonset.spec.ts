import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonset } from './filter-buttonset';

describe('FilterButtonset', () => {
  let component: FilterButtonset;
  let fixture: ComponentFixture<FilterButtonset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterButtonset]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterButtonset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
