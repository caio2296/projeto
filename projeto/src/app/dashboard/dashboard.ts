/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../autenticacao/Services/usuarioService';
import { TemaService } from '../shared/nav-bar/Services/tema-service';

import { CalendarFormService } from '../calendario/ServicosCalendario/calendarFormService';
import { DateHelperService } from '../calendario/ServicosCalendario/dateHelperService';
import { InputConfig } from '../calendario/ServicosCalendario/InputConfig';
import { CalendarBarModelService } from '../calendario/ServicosCalendario/calendarBarModel';
import { FiltroServiceApi } from '../filtros/ServicesFiltro/filtro-service-api';
import { Col, FilterCat, Row } from '../calendario/Models/type';
import { DashboardService } from './Service/DashboardService';
import { Root } from '../calendario/Models/type';
import { TabelasServiceApi } from '../shared/tabela/TabelasServices/TabelasServicesApi';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  filtros: FilterCat[] | null = null;

  tabelas: Root[] = [];

  tabelasProcessadas: any[] = [];

  grid: any[] = [];
  displayedColumns: string[] = [];

  // 🔥 NOVO: estrutura já organizada por tipo
  filtrosPorTipo: Record<string, FilterCat[]> = {};

  // 🔥 NOVO: configuração dos tipos 
  tipos = [
    { key: 'select', label: 'Filtros Select' },
    { key: 'img', label: 'Filtros Imagens' },
    { key: 'multiselect', label: 'Filtros Multi Select' },
    { key: 'chk', label: 'Filtros Checkout' },
    { key: 'buttonset', label: 'Filtros Button set' },
    { key: 'btn', label: 'Filtros Button' }
  ];

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    protected temaService: TemaService,
    protected router: Router,
    protected userService: UsuarioService,
    private filtroServiceApi: FiltroServiceApi,
    private tabelasServicesApi: TabelasServiceApi,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {

    // 1️⃣ dados iniciais
    this.route.data.subscribe(data => {
      const dashboard = data['dashboard'];
      if (dashboard?.filtros) {
        this.filtros = dashboard.filtros;
        this.montarFiltrosPorTipo();
      }

      if (dashboard?.tabelas) {
        this.tabelas = dashboard.tabelas;
        this.montarTabela();
        // console.log("Tabelas capturadas:", dashboard.tabelas);
      }
    });
  }

  // 🔥 NOVA: monta tudo uma vez só
  private montarTabela() {

    if (!this.tabelas?.length) return;

    this.tabelasProcessadas = [];

    this.tabelas.forEach(t => {

      const tablabis = t?.tablabis?.[0];
      const template = tablabis?.templates?.[0];

      const rows = template?.rows || [];
      const cols = template?.cols || [];

      const displayedColumns = [
        'rowHeader',
        ...cols.map(c => this.normalizarColuna(c))
      ];

      // const grid = rows.map(row => {

      //   const linha: any = {
      //     rowHeader: row.text ?? 'Sem nome'
      //   };

      //   cols.forEach(col => {
      //     const colName = this.normalizarColuna(col);
      //     linha[colName] = this.getValorDinamico(row, col);
      //   });

      //   return linha;
      // });
      
     const grid = this.buildGrid(rows, cols);


      this.tabelasProcessadas.push({
        titulo: tablabis?.description,
        grid,
        displayedColumns
      });

    });

    console.log("TABELAS PROCESSADAS:", this.tabelasProcessadas);
  }

// cria a gird que será utilizado na tabela
  private buildGrid(rows: Row[], cols: Col[]): any[] {

  const result: any[] = [];

  const map = new Map<number, Row[]>();

  // 🔥 agrupa filhos por parent
  rows.forEach(r => {
    if (!map.has(r.parent ?? 0)) {
      map.set(r.parent ?? 0, []);
    }
    map.get(r.parent ?? 0)!.push(r);
  });

  const build = (parent: number | null, level = 0) => {

    const children = map.get(parent ?? 0) || [];

    children.forEach(row => {

      const linha: any = {
        id: row.id_row_schema,
        parent: row.parent,
        level,
        expanded: false,
        visible: parent === null, // 🔥 só raiz visível
        rowHeader: row.text ?? 'Sem nome'
      };

      // 🔥 colunas dinâmicas
      cols.forEach(col => {
        const colName = this.normalizarColuna(col);
        linha[colName] = this.getValorDinamico(row, col);
      });

      result.push(linha);

      // 🔥 RECURSÃO (filhos logo abaixo do pai)
      build(row.id_row_schema, level + 1);
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

  // torna os valores dos nós dinamicos
  getValorDinamico(row: any, col: any): any {
    // ⚠️ REGRA TEMPORÁRIA (você precisa alinhar com backend depois)
    //  const node = row.nodes?.[colIndex];
    const node = row.nodes?.find((n: { order: number; }) => n.order == col.order);


    // return node?.indicator?.description || '-';

    return node?.format_text || '-';
  }

  trackFiltro(index: number, item: FilterCat) {
    return item.id;
  }

  toggleTheme(): void {
    this.temaService.toggleTheme();
  }

  // 🔥 FUNÇÃO RECURSIVA (mantida)
  private flattenFiltros(filtros: FilterCat[]): FilterCat[] {
    return filtros.reduce((acc, f) => {
      acc.push(f);

      if (f.children?.length) {
        acc.push(...this.flattenFiltros(f.children));
      }

      return acc;
    }, [] as FilterCat[]);
  }

  // 🔥 SUA FUNÇÃO (mantida, só ajustada)
  public filtrosTipo(tipo: string): FilterCat[] {
    return (this.filtros ?? [])
      .map(f => {
        const filhos = this.flattenFiltros(f.children ?? [])
          .filter(x => x.typectrl === tipo);

        if (!filhos.length) return null;

        return {
          ...f,
          children: filhos
        } as FilterCat;
      })
      .filter((f): f is FilterCat => f !== null);
  }

  // 🔥 NOVA: monta tudo uma vez só
  private montarFiltrosPorTipo() {

    const resultado: Record<string, FilterCat[]> = {};

    for (const tipo of this.tipos) {
      resultado[tipo.key] = this.filtrosTipo(tipo.key);
    }

    this.filtrosPorTipo = resultado;
  }
}