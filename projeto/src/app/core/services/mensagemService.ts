/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, tipo: 'sucesso' | 'erro' | 'aviso' = 'aviso') {
     let cssClass = 'snackbar-aviso';


  if (tipo === 'sucesso') cssClass = 'snackbar-sucesso';
  if (tipo === 'erro') cssClass = 'snackbar-erro';
    this._snackBar.open(message, undefined, {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: [cssClass]
    });
}
}
