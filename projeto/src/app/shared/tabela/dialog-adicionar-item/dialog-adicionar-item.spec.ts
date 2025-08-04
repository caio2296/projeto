import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdicionarItem } from './dialog-adicionar-item';

describe('DialogAdicionarItem', () => {
  let component: DialogAdicionarItem;
  let fixture: ComponentFixture<DialogAdicionarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAdicionarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAdicionarItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
