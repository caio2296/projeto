/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-adicionar-item',
  standalone: false,
  templateUrl: './dialog-adicionar-item.html',
  styleUrl: './dialog-adicionar-item.scss'
})
export class DialogAdicionarItem implements OnInit {
  selected = 'Médio';
  cadastroForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAdicionarItem>,
    @Inject(MAT_DIALOG_DATA) public data: { descricao: string; tamanho: string },
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      descricao: [null, Validators.required],
      tamanho: ['Médio', Validators.required]
    });
  }

  salvar() {
    if (this.cadastroForm.valid) {
      this.dialogRef.close(this.cadastroForm.value); // envia os dados para o componente pai
    }
  }

}
