/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirme-delete',
  standalone: false,
  templateUrl: './dialog-confirme-delete.html',
  styleUrl: './dialog-confirme-delete.scss'
})
export class DialogConfirmeDelete {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmeDelete>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}

   fechar(result: boolean) {
    this.dialogRef.close(result);
  }
}
