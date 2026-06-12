/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../autenticacao/Services/usuarioService';
import { TemaService } from '../shared/nav-bar/Services/tema-service';

import { CalendarFormService } from '../calendario/ServicosCalendario/calendarFormService';
import { DateHelperService } from '../calendario/ServicosCalendario/dateHelperService';
import { InputConfig } from '../calendario/ServicosCalendario/InputConfig';
import { CalendarBarModelService } from '../calendario/ServicosCalendario/calendarBarModel';
import { DashboardFilterService } from './Service/dashboard-filter-service';
import { DashboardTabelaService } from './Service/dashboard-tabela-service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  grid: any[] = [];
  displayedColumns: string[] = [];

  constructor(
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    protected temaService: TemaService,
    protected router: Router,
    protected userService: UsuarioService,
    private route: ActivatedRoute,
    protected dashboardFilterService: DashboardFilterService,
    protected dashboardTabelaService:  DashboardTabelaService,
  ) { }

  ngOnInit() {

    // 1️⃣ dados iniciais
    this.route.data.subscribe(data => {
      const dashboard = data['dashboard'];
      if (dashboard?.filtros) {
        this.dashboardFilterService.filtros = dashboard.filtros;
        this.dashboardFilterService.montarFiltrosPorTipo();
      }
     

      if (dashboard?.tabelas) {
        this.dashboardTabelaService.tabelas = dashboard.tabelas;
        this.dashboardTabelaService.montarTabela();
        // console.log("Tabelas capturadas:", dashboard.tabelas);
      }
    });


    // console.log("header por nivel",this.headerRowsPorNivel);

  }

  toggleTheme(): void {
    this.temaService.toggleTheme();
  }


}