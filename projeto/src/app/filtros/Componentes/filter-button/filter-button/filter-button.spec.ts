import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButton } from './filter-button';

describe('FilterButton', () => {
  let component: FilterButton;
  let fixture: ComponentFixture<FilterButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
