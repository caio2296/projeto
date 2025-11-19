import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterImage } from './filter-image';

describe('FilterImage', () => {
  let component: FilterImage;
  let fixture: ComponentFixture<FilterImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
