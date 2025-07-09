/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

import { frutas } from '../Models/type';
import { DialogAdicionarItem } from '../dialog-adicionar-item/dialog-adicionar-item';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
interface Fruta {
  id: number;
  descricao: string;
  tamanho: string;
}


@Component({
  selector: 'app-tabela',
  standalone: false,
  templateUrl: './tabela.html',
  styleUrl: './tabela.scss'
})
export class Tabela {


  constructor(private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'descricao', 'acao'];
   valores:any[] = Object.values(frutas);
   //no frutas irá vir um json da Api exemplo:
   //    `[
   //   { "id": 1, "descricao": "banana", "tamanho": "médio" },
   //   { "id": 2, "descricao": "maçã", "tamanho": "pequeno" },
   //   { "id": 3, "descricao": "melancia", "tamanho": "grande" }
   // ]`

  // Transformar cada objeto em array

jsonString = `
  [
    { "id": 1, "descricao": "banana", "tamanho": "médio" },
    { "id": 2, "descricao": "maçã", "tamanho": "pequeno" },
    { "id": 3, "descricao": "melancia", "tamanho": "grande" }
  ]
`;

 frutas: Fruta[] = JSON.parse(this.jsonString);
dataSource = frutas.map(f => [f.id, f.descricao, f.tamanho]);
  // dataSource: any[][] = frutas.map(obj => Object.values(obj));

  getCampos(obj: any): { chave: string, valor: any }[] {
  return Object.entries(obj).map(([chave, valor]) => ({ chave, valor }));
}

  abrirModalAdicionar(event: Event): void {
    (event.target as HTMLElement).blur();

    const dialogRef = this.dialog.open(DialogAdicionarItem, {
      data: { descricao: '', tamanho: '' }
    });

    // Foca o primeiro input depois de abrir
    dialogRef.afterOpened().subscribe(() => {
      const input = document.querySelector<HTMLInputElement>('input[formcontrolname="descricao"]');
      input?.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novoId = this.dataSource.length + 1;

        const novoItem = {
          id: novoId,
          descricao: result.descricao,
          tamanho: result.tamanho || 'Indefinido'
        };

 
         const novoItemArray = Object.values(novoItem);

        console.log(novoItem);

        // aqui colocar um serviço para enviar os novos dados
        //convertando o array para json para ser enviado para o serviço 
        const chaves = ['id', 'descricao', 'tamanho'];
        this.dataSource = [...this.dataSource, novoItemArray];

        const jsonConvertido = this.dataSource.map(item =>
          Object.fromEntries(chaves.map((key, i) => [key, item[i]]))
        );

        console.log(jsonConvertido);

        const json = Object.fromEntries(chaves.map((key, i) => [key, novoItemArray[i]]));
         console.log(json);
      }
    });
  }

  abrirModal(element: any, event: Event) {
    // const valores = Object.values(element);
    // console.log(valores[0]); // 1
    // console.log(valores[1]); // 'banana'
    // console.log(valores[2]); // 'médio'
    console.log(element);
    (event.target as HTMLElement).blur();

    const dialogRef = this.dialog.open(Dialog, {
      data: element,
    });

    dialogRef.afterOpened().subscribe(() => {
      const btn = document.querySelector('button.fechar-dialog') as HTMLElement;
      btn?.focus();
    });
  }
}