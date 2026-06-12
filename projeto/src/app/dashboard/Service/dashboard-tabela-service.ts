/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Col, Root, Row } from '../../calendario/Models/type';

@Injectable({
  providedIn: 'root'
})
export class DashboardTabelaService {


    public tabelas: Root[] = [];

    tabelasProcessadas: any[] = [];

    headerRowsPorNivel: string[][] = [];

    ultimoLevelColuna = 0;


    // 🔥 NOVA: monta tudo uma vez só
    public montarTabela() {

      if (!this.tabelas?.length) return;

      this.tabelasProcessadas = [];

      this.tabelas.forEach(t => {

        const tablabis = t?.tablabis?.[0];
        const template = tablabis?.templates?.[0];

        const rows = template?.rows || [];
        const cols = template?.cols || [];

        const orderedCols = this.buildColumns(cols);

        // 🔥 HEADERS POR NIVEL
        this.headerRowsPorNivel =
          this.buildHeadersByLevel(orderedCols);

        console.log(
          'HEADER ROWS:',
          this.headerRowsPorNivel
        );

        this.ultimoLevelColuna = Math.max(
          ...orderedCols.map(c => c.level || 0)
        );

        // const parentCols = orderedCols.filter(c => !c.parent);

        const colTree = this.buildColumnsTree(orderedCols);

        const displayedColumns = [
          'rowHeader',
          ...orderedCols.map(c => this.normalizarColuna(c))
        ];

        const ColsLevelRepetMax = orderedCols.filter(
      c =>
        c.level === this.LevelMaisRepetidoPelasColunas(cols)
    );

        const grid = this.buildGrid(rows, cols);

        this.tabelasProcessadas.push({
          titulo: tablabis?.description,
          grid,
          displayedColumns,
          ColsLevelRepetMax,
          colTree,
          // headerRowsPorNivel: this.headerRowsPorNivel
        });

      });

      console.log(
        'TABELAS PROCESSADAS:',
        this.tabelasProcessadas
      );
    }

    buildColumnsTree(cols: Col[]) {

    const buildNode = (parentId: number | null): any[] => {

      return cols
        .filter(c => (c.parent ?? null) === parentId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(col => ({

          id: col.id_col_schema,

          name: this.normalizarColuna(col),

          level: col.level,

          original: col,

          filhos: buildNode(col.id_col_schema)

        }));
    };

    return buildNode(null);
  }
    
  private LevelMaisRepetidoPelasColunas(cols: Col[])
  {

    const orderedCols = this.buildColumns(cols);
    const levelCount: Record<number, number> = {};

  // conta quantas vezes cada level aparece
  orderedCols.forEach(col => {

    const level = col.level ?? 0;

    levelCount[level] = (levelCount[level] || 0) + 1;

  });

  // descobre o level mais frequente
  const mostRepeatedLevel = Number(
    Object.keys(levelCount)
      .reduce((a, b) =>
        levelCount[+a] > levelCount[+b] ? a : b
      )
  );

  return mostRepeatedLevel;
  }

  // cria a grid que será utilizado na tabela
  private buildGrid(rows: Row[], cols: Col[]): any[] {

    const result: any[] = [];
    const map = new Map<number, Row[]>();

    rows.forEach(r => {
      const parent = r.parent ?? 0;

      if (!map.has(parent)) {
        map.set(parent, []);
      }

      map.get(parent)!.push(r);
    });

    const orderedCols = this.buildColumns(cols);

    // 🔥 separa pais e filhos
    const parentCols = orderedCols.filter(c => !c.parent);
    const childCols = orderedCols.filter(c => c.parent);

    const build = (parent: number | null, level = 0) => {

      const children = map.get(parent ?? 0) || [];

      children
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .forEach(row => {

          // 🔥 LINHA NORMAL
          const linha: any = {
            id: row.id_row_schema,
            parent: row.parent,
            level,
            expanded: false,
            visible: parent === null,
            rowHeader: row.text ?? 'Sem nome',
            isSubHeader: false
          };


  parentCols.forEach(col => {

    // valor da própria coluna
    const colName = this.normalizarColuna(col);

    linha[colName] = this.getValorDinamico(
      row,
      col,
      orderedCols
    );

    // procura filhos da coluna atual
    const filhos = childCols.filter(
      c => c.parent === col.id_col_schema
    );


    // monta os filhos
    filhos.forEach(filho => {

      const nomeFilho = this.normalizarColuna(filho);

      linha[nomeFilho] = this.getValorDinamico(
        row,
        filho,
        orderedCols
      );

    });

  });

          result.push(linha);



          build(row.id_row_schema, level + 1);
        });


    };

                  // 🔥 🔥 SUA IDEIA AQUI (*)
          // se tiver colunas filhas → cria linha extra
  parentCols.forEach(parentCol => {

    const filhos = childCols.filter(c => c.parent === parentCol.id_col_schema);

    if (filhos.length) {

      const subLinha: any = {
        rowHeader:parentCol.text,
        visible: false,
        isSubHeader: true
      };

      filhos.forEach(f => {
        const colName = this.normalizarColuna(f);
        subLinha[colName] = this.getValorDinamico("testando nodes", f,orderedCols);
      });

      result.push(subLinha);
    }

  });

    build(null);

    return result;
  }

  // cria as colunas das tabelas
  private buildColumns(cols: Col[]): Col[] {

    const result: Col[] = [];
    const map = new Map<number, Col[]>();

    cols.forEach(c => {
      const parent = c.parent ?? 0;

      if (!map.has(parent)) {
        map.set(parent, []);
      }

      map.get(parent)!.push(c);
    });

    const build = (parent: number | null) => {

      const children = map.get(parent ?? 0) || []; //inserir as colunas filhas no grid e cada filha com o mesmo parent igual criaria essa linha extra na tabela *

      children
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // 🔥 importante
        .forEach(col => {

          result.push(col);

          build(col.id_col_schema);
        });
    };

    build(null);

    return result;
  }

    // normaliza o nome tas colunas
    normalizarColuna(col: any): string {
      return (col.text ?? 'col_' + col.id_col_schema)
        .replace(/\s+/g, '_')   // espaço → _
        .toLowerCase();
    }

  buildHeadersByLevel(cols: Col[]) {

    const tree = this.buildColumnsTree(cols);

    const maxLevel = Math.max(
      ...cols.map(c => c.level ?? 0)
    );

    const headers: string[][] = [];

    const walk = (
      nodes: any[],
      level: number
    ) => {

      if (!headers[level]) {
        headers[level] = [];
      }

      nodes.forEach(node => {

        headers[level].push(node.name);

        if (node.filhos?.length) {

          walk(
            node.filhos,
            level + 1
          );

        } else {

          // completa os níveis faltantes
          for (
            let l = level + 1;
            l <= maxLevel;
            l++
          ) {

            if (!headers[l]) {
              headers[l] = [];
            }

            headers[l].push(
              `__EMPTY__${node.id}_${l}`
            );
          }

        }

      });

    };

    walk(tree, 0);

    headers[0].unshift('rowHeader');

    return headers;
  }

    // torna os valores dos nós dinamicos
  getValorDinamico(
    row: any,
    col: any,
    orderedCols?: any[]
  ): any {

    const cols = orderedCols ?? [];

    const nivelMaisRepetido =
      this.LevelMaisRepetidoPelasColunas(cols);

    const colunasFolha = cols
      .filter(c => c.level === nivelMaisRepetido)
      .sort((a, b) => a.order - b.order);

    const indiceColuna =
      colunasFolha.findIndex(
        c => c.id_col_schema === col.id_col_schema
      );

    if (indiceColuna < 0) {
      return '-';
    }

    const nodesOrdenados = [...(row.nodes ?? [])]
      .sort((a, b) => a.order - b.order);

    return nodesOrdenados[indiceColuna]?.format_text ?? '-';
  }
}
