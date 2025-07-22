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
  cadastroForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogAdicionarItem>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id?: string; descricao: string; tamanho: string; cor: string },
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      descricao: [this.data?.descricao || '', Validators.required],
      tamanho: [this.data?.tamanho || 'Pequeno', Validators.required],
      cor: [this.data?.cor || '', Validators.required]
    });
  }

  salvar() {
    if (this.cadastroForm.valid) {
      const resultado = this.data?.id
        ? { id: this.data.id, ...this.cadastroForm.value } // caso edição
        : this.cadastroForm.value; // caso criação

      this.dialogRef.close(resultado);
    }
  }
}

