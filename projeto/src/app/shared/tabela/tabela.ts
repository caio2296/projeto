/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';


import { DialogAdicionarItem } from './dialog-adicionar-item/dialog-adicionar-item';
import { ApiService } from '../../Services/api-service';
import { frutas } from '../Models/type';

@Component({
  selector: 'app-tabela',
  standalone: false,
  templateUrl: './tabela.html',
  styleUrl: './tabela.scss'
})
export class Tabela implements OnInit {

  displayedColumns: string[] = [];
  dataSource: frutas[] = [];

  constructor(private dialog: MatDialog, private apiService: ApiService) {
  }
  getIndexFromColumn(column: string): number {
    // Pula a coluna de ação
    return this.displayedColumns.indexOf(column);
  }
  ngOnInit(): void {
    this.apiService.listarFrutas().subscribe({
      next: (res) => {
        this.dataSource = res;
        if (res.length > 0) {
          this.displayedColumns = Object.keys(res[0]);
          this.displayedColumns.push('acao');
        }
      },
      error: (err) => console.error("Erro ao carregar frutas:", err)
    });
  }

  getCampos(obj: any): { chave: string, valor: any }[] {
    return Object.entries(obj).map(([chave, valor]) => ({ chave, valor }));
  }

  abrirModalAdicionar(event: Event): void {
    (event.target as HTMLElement).blur();

    const dialogRef = this.dialog.open(DialogAdicionarItem, {
      data: { descricao: '', tamanho: '', cor: '' }
    });

    // Foca o primeiro input depois de abrir
    dialogRef.afterOpened().subscribe(() => {
      const input = document.querySelector<HTMLInputElement>('input[formcontrolname="descricao"]');
      input?.focus();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novoId = this.dataSource.length + 1;
        const novoItem: frutas = {
          id: novoId.toString(),
          descricao: result.descricao,
          tamanho: result.tamanho || 'Indefinido',
          cor: result.cor || 'Indefinido'
        };


        this.dataSource = [...this.dataSource, novoItem];
        this.apiService.adicionarFruta(novoItem).subscribe({
          next: (res) => {
            console.log("Fruta adicionada com sucesso:", res);
          },
          error: (err) => {
            console.error("Erro ao adicionar fruta:", err);
          }
        });

      }
    });
  }

  deletarItem(element: any): void {
    // Confirmação simples (pode ser substituída por dialog Angular Material)
    const confirmacao = confirm(`Deseja realmente deletar o item: ${element.descricao}?`);

    if (confirmacao) {
      // Remove do dataSource
      this.dataSource = this.dataSource.filter(item => item.id !== element.id);

      this.apiService.deletarFruta(element).subscribe({
        next: () => console.log("Item deletado com sucesso"),
        error: err => console.error("Erro ao deletar item:", err)
      });

    }
  }

  abrirModal(element: any, event: Event) {

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

  abrirModalEditar(element: frutas, event: Event): void {
  event.stopPropagation();

  const dialogRef = this.dialog.open(DialogAdicionarItem, {
    width: '400px',
    data: {
      id: element.id,
      descricao: element.descricao,
      tamanho: element.tamanho,
      cor: element.cor
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const index = this.dataSource.findIndex(item => item.id === element.id);
      if (index !== -1) {
        this.dataSource[index] = result;
        this.dataSource = [...this.dataSource];

        this.apiService.atualizarFruta(result).subscribe({
          next: () => console.log("Item atualizado com sucesso"),
          error: err => console.error("Erro ao atualizar item:", err)
        });
      }
    }
  });
}

}