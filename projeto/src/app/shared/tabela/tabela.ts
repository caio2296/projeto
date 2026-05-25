/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';

import { DialogAdicionarItem } from './dialog-adicionar-item/dialog-adicionar-item';
import { ApiService } from '../../Services/api-service';
import { frutas } from '../Models/type';
import { DialogConfirmeDelete } from './dialog-confirme-delete/dialog-confirme-delete';
import { TranslocoService } from '@jsverse/transloco';

import { OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabela',
  standalone: false,
  templateUrl: './tabela.html',
  styleUrl: './tabela.scss'
})
export class Tabela implements OnInit, OnChanges{


  // dataSource: frutas[] = [];
  @Input() grid: any[] = [];
  @Input() displayedColumns: string[] = [];

  @Input() childCols: any[] = [];

@Input() colTree: any[] = [];

  headerRows: string[][] = [];
parentHeader: string[] = [];
childHeader: string[] = [];
allColumns: string[] = [];


childDisplayedColumns: string[] = [];

subHeaderColumns: string[] = [];

// 🔥 Recebe as colunas do Dashboard
// @Input() colTree: any[] = [];


  // columnLabels: Record<string, string> = {
  //   id: 'Dashboard.TabelaHeader.Id',
  //   descricao: 'Dashboard.TabelaHeader.Descricao',
  //   tamanho: 'Dashboard.TabelaHeader.Tamanho',
  //   cor: 'Dashboard.TabelaHeader.Cor',
  //   acao: 'Dashboard.TabelaHeader.Acao'
  // };

  constructor(private dialog: MatDialog, private apiService: ApiService, private translocoService:TranslocoService) {
  }

   ngOnInit(): void {

  // 🔥 pega só colunas filhas (level > 0 ou parent != null)
  // this.childCols = this.colTree.filter(c => c.parent);

  // 🔥 transforma em nome de coluna (string)
  this.childDisplayedColumns = this.childCols.map(c =>
    this.normalizarColuna(c)
  );

    // 🔥 AQUI ESTÁ A SOLUÇÃO
  this.subHeaderColumns = ['rowHeader', ...this.childDisplayedColumns];

  console.log('subHeaderColumns:', this.subHeaderColumns);

//   this.allColumns = Array.from(
//   new Set(this.headerRows.flat())
// );

console.log('parentHeader:', this.parentHeader);
console.log('childHeader:', this.childHeader);
console.log('allColumns:', this.allColumns);
console.log('grid:', this.grid);
}

ngOnChanges(changes: SimpleChanges): void {

  if (this.displayedColumns?.length) {
    console.log('Inputs chegaram!');

    this.buildHeaders();
  }

}

buildColTree() {
  const tree: any[] = [];

  this.displayedColumns
    .filter(c => c !== 'rowHeader')
    .forEach(parentCol => {

      const parentObj = this.childCols.find(c =>
        this.normalizarColuna(c) === parentCol
      );

      const children = this.childCols
        .filter(c => c.parent === parentObj?.id_col_schema)
        .map(c => this.normalizarColuna(c));

      tree.push({
        name: parentCol,
        children
      });
    });

  return tree;
}

buildHeaders() {
  const colTree = this.buildColTree();

  const parent: string[] = ['rowHeader'];
  const child: string[] = ['rowHeader'];

  colTree.forEach(p => {
    parent.push(p.name);

    // 🔥 só adiciona filhos se existirem
    if (p.children.length) {
      child.push(...p.children);
    }
  });

  this.parentHeader = parent;
  this.childHeader = child;

  // 🔥 junta tudo sem fake column
  this.allColumns = Array.from(new Set([
    ...parent,
    ...child
  ]));

  console.log('parentHeader:', this.parentHeader);
  console.log('childHeader:', this.childHeader);
  console.log('allColumns:', this.allColumns);

  console.log('childHeader:', this.childHeader);
}



// 🔥 você já tem isso, mas garantindo aqui
normalizarColuna(col: any): string {
  return (col.text ?? 'col_' + col.id_col_schema)
    .replace(/\s+/g, '_')
    .toLowerCase();
}

    hasChildren(row: any, data: any[]): boolean {
  return data.some(r => r.parent === row.id);
}

toggle(row: any) {
  row.expanded = !row.expanded;

  this.grid.forEach(r => {
    if (r.parent === row.id) {
      r.visible = row.expanded;

      if (!row.expanded) {
        this.hideChildren(r);
      }
    }
  });
}


getColSpan(column: string): number {

  const parent = this.colTree.find(
    (c: any) => c.name === column
  );

  if (!parent) {
    return 1;
  }

  return parent.filhos.length || 1;
}


private hideChildren(row: any) {
  this.grid.forEach(r => {
    if (r.parent === row.id) {
      r.visible = false;
      this.hideChildren(r);
    }
  });
}

isVisible(row: any, data: any[]): boolean {

  let current = row;

  while (current.parent) {
    const parent = data.find(r => r.id === current.parent);

    if (!parent || !parent.expanded) return false;

    current = parent;
  }

  return true;
}


  // getIndexFromColumn(column: string): number {
  //   // Pula a coluna de ação
  //   return this.displayedColumns.indexOf(column);
  // }


  // getCampos(obj: any): { chave: string, valor: any }[] {
  //   return Object.entries(obj).map(([chave, valor]) => ({ chave, valor }));
  // }

  // abrirModalAdicionar(event: Event): void {
  //   (event.target as HTMLElement).blur();

  //   const dialogRef = this.dialog.open(DialogAdicionarItem, {
  //     data: { descricao: '', tamanho: '', cor: '' }
  //   });

  //   // Foca o primeiro input depois de abrir
  //   dialogRef.afterOpened().subscribe(() => {
  //     const input = document.querySelector<HTMLInputElement>('input[formcontrolname="descricao"]');
  //     input?.focus();
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const novoId = this.dataSource.length + 1;
  //       const novoItem: frutas = {
  //         id: novoId.toString(),
  //         descricao: result.descricao,
  //         tamanho: result.tamanho || 'Indefinido',
  //         cor: result.cor || 'Indefinido'
  //       };

  //       this.dataSource = [...this.dataSource, novoItem];
  //       this.apiService.adicionarFruta(novoItem).subscribe({
  //         next: (res) => {
  //           console.log("Fruta adicionada com sucesso:", res);

  //           this.BuscarListaFrutas();
  //         },
  //         error: (err) => {
  //           console.error("Erro ao adicionar fruta:", err);
  //         }
  //       });

  //     }
  //   });
  // }

  // deletarItem(element: any): void {
  //   // const dialogRef = this.dialog.open(DialogConfirmeDelete, {
  //   //   data: { mensagem: `Deseja realmente deletar o item: ${element.descricao}?` }
  //   // });

  //   // dialogRef.afterClosed().subscribe(confirmado => {
  //   //   if (confirmado) {
  //   //     this.dataSource = this.dataSource.filter(item => item.id !== element.id);
  //   //     this.apiService.deletarFruta(element).subscribe({
  //   //       next: () => console.log("Item deletado com sucesso"),
  //   //       error: err => console.error("Erro ao deletar item:", err)
  //   //     });
  //   //   }
  //   // });

  //   this.translocoService.selectTranslate('Dashboard.TabelaDialog.Deletar.MensagemDelete', { item: element.descricao })
  //     .pipe(take(1))
  //     .subscribe(mensagemTraduzida => {
    
  //       const dialogRef = this.dialog.open(DialogConfirmeDelete, {
  //         data: { mensagem: mensagemTraduzida }
  //       });
  //       dialogRef.afterClosed().subscribe(confirmado => {
  //       if (confirmado) {
  //         this.dataSource = this.dataSource.filter(item => item.id !== element.id);
  //         this.apiService.deletarFruta(element).subscribe({
  //           next: () => console.log("Item deletado com sucesso"),
  //           error: err => console.error("Erro ao deletar item:", err)
  //         });
  //       }
  //     });
  //     });
  // }

  // abrirModal(element: any, event: Event) {

  //   console.log(element);
  //   (event.target as HTMLElement).blur();

  //   const dialogRef = this.dialog.open(Dialog, {
  //     data: element,
  //   });

  //   dialogRef.afterOpened().subscribe(() => {
  //     const btn = document.querySelector('button.fechar-dialog') as HTMLElement;
  //     btn?.focus();
  //   });
  // }

  // abrirModalEditar(element: frutas, event: Event): void {
  //   event.stopPropagation();

  //   const dialogRef = this.dialog.open(DialogAdicionarItem, {
  //     width: '400px',
  //     data: {
  //       id: element.id,
  //       descricao: element.descricao,
  //       tamanho: element.tamanho,
  //       cor: element.cor
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const index = this.dataSource.findIndex(item => item.id === element.id);
  //       if (index !== -1) {
  //         this.dataSource[index] = result;
  //         this.dataSource = [...this.dataSource];

  //         this.apiService.atualizarFruta(result).subscribe({
  //           next: () => console.log("Item atualizado com sucesso"),
  //           error: err => console.error("Erro ao atualizar item:", err)
  //         });
  //       }
  //     }
  //   });
  // }

  // private BuscarListaFrutas() {
  //   this.apiService.listarFrutas().subscribe({
  //     next: (res) => {
  //       this.dataSource = res;
  //       if (res.length > 0) {
  //         this.displayedColumns = Object.keys(res[0]);
  //         console.log(this.displayedColumns);
  //         this.displayedColumns.push('acao');
  //       }
  //     },
  //     error: (err) => console.error("Erro ao carregar frutas:", err)
  //   });
  // }

}