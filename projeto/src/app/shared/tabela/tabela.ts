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

  @Input() ColsLevelRepetMax: any[] = [];

  @Input() colTree: any[] = [];

  @Input() headerRowsPorNivel: string[][]= [];

  headerRows: string[][] = [];
  parentHeader: string[] = [];
  childHeader: string[] = [];
  allColumns: string[] = [];


subHeaderColumnsMax: string[] = [];

// 🔥 Recebe as colunas do Dashboard


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

    // 🔥 1. transforma em nome de coluna (string)
    // 🔥 2. insere o rowHeader (placeholder da primeira coluna) para ter a quantidade exatada com a tabela que será exibida
    this.subHeaderColumnsMax = ['rowHeader', ...this.ColsLevelRepetMax.map(c => this.normalizarColuna(c))];

    console.log('subHeaderColumnsMax:', this.subHeaderColumnsMax);
    console.log('headerRowsPorNivel:', this.headerRowsPorNivel);

    console.log('parentHeader:', this.parentHeader);
    console.log('displayedColumns:', this.displayedColumns);
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

getHeaderNames(row: any[]) {
  return row.map(x => x.name);
}

buildHeaders() {

  interface HeaderCell {
    name: string;
    colspan: number;
    rowspan: number;
  }

  const headersPorNivel: HeaderCell[][] = [];

  const maxLevel =
    this.getMaxLevel(this.colTree);

  const todasColunas: string[] = [];

  let emptyIndex = 0;

  const walk = (
    nodes: any[],
    level = 0
  ) => {

    if (!headersPorNivel[level]) {

      headersPorNivel[level] = [];

      headersPorNivel[level].push({

        name: 'rowHeader',

        colspan: 1,

        rowspan:
          level === 0
            ? maxLevel + 1
            : 1

      });

    }

    nodes.forEach(node => {

      const possuiFilhos =
        node.filhos?.length > 0;

      const colspan =
        this.countLeafs(node);

      const rowspan =
        possuiFilhos
          ? 1
          : (maxLevel - level + 1);

      headersPorNivel[level].push({

        name: node.name,

        colspan,

        rowspan

      });

      if (possuiFilhos) {

        walk(
          node.filhos,
          level + 1
        );

      } else {

        // Completa os níveis abaixo com EMPTY
        for (
          let nextLevel = level + 1;
          nextLevel <= maxLevel;
          nextLevel++
        ) {

          if (!headersPorNivel[nextLevel]) {

            headersPorNivel[nextLevel] = [];

            headersPorNivel[nextLevel].push({

              name: 'rowHeader',

              colspan: 1,

              rowspan: 1

            });

          }

          headersPorNivel[nextLevel].push({

            name:
              `__EMPTY__${emptyIndex++}_${nextLevel}`,

            colspan: 1,

            rowspan: 1

          });

        }

      }

    });

  };

  walk(this.colTree);

  const walkColumns = (
    nodes: any[]
  ) => {

    nodes.forEach(node => {

      todasColunas.push(
        node.name
      );

      if (node.filhos?.length) {

        walkColumns(
          node.filhos
        );

      }

    });

  };

  walkColumns(this.colTree);

  const folhas =
    this.getLeafColumns(
      this.colTree
    );

  this.headerRows =
    headersPorNivel as any;

  this.allColumns =
    Array.from(
      new Set([
        'rowHeader',

        ...todasColunas,

        ...folhas.map(
          (f: any) => f.name
        ),

        ...headersPorNivel
          .flat()
          .filter(x =>
            x.name.startsWith(
              '__EMPTY__'
            )
          )
          .map(x => x.name)

      ])
    );

  console.log(
    'headerRows',
    this.headerRows
  );

  console.log(
    'allColumns',
    this.allColumns
  );
}

getLeafColumns(nodes: any[]): any[] {

  const result: any[] = [];

  nodes.forEach(node => {

    if (!node.filhos?.length) {
      result.push(node);
    } else {
      result.push(
        ...this.getLeafColumns(node.filhos)
      );
    }

  });

  return result;
}

countLeafs(node: any): number {

  if (!node.filhos?.length) {
    return 1;
  }

  return node.filhos.reduce(
    (acc: number, filho: any) =>
      acc + this.countLeafs(filho),
    0
  );
}

getMaxLevel(nodes: any[]): number {

  let max = 0;

  const walk = (arr: any[]) => {

    arr.forEach(n => {

      max = Math.max(max, n.level);

      if (n.filhos?.length) {
        walk(n.filhos);
      }

    });
  };

  walk(nodes);

  return max;
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

  const findNode = (nodes: any[]): any => {

    for (const node of nodes) {

      if (node.name === column) {
        return node;
      }

      if (node.filhos?.length) {

        const found = findNode(node.filhos);

        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  const node = findNode(this.colTree);

  if (!node) {
    return 1;
  }

  return this.countLeafs(node);
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