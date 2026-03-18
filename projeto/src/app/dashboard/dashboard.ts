/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../autenticacao/Services/token-service';
import { UsuarioService } from '../autenticacao/Services/usuarioService';
import { TemaService } from '../shared/nav-bar/Services/tema-service';

import { CalendarFormService } from '../calendario/ServicosCalendario/calendarFormService';
import { DateHelperService } from '../calendario/ServicosCalendario/dateHelperService';
import { InputConfig } from '../calendario/ServicosCalendario/InputConfig';
import { CalendarBarModelService } from '../calendario/ServicosCalendario/calendarBarModel';
import { FiltroServiceApi } from '../filtros/ServicesFiltro/filtro-service-api';
import { FilterCat } from '../calendario/Models/type';
import { DashboardService } from './Service/DashboardService';



@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  filtros: FilterCat[] | null = null;
  ctrlsId!: number;



  showFiller = false;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    protected temaService: TemaService,
    protected router: Router,
    protected userService: UsuarioService,
    private tokenService: TokenService,
    private filtroServiceApi: FiltroServiceApi,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
  ) { }





  ngOnInit() {
    // this.ctrlsId = 1;
    // // 1) Primeiro buscar os dados
    // this.filtroServiceApi.carregarDados(this.ctrlsId).subscribe({
    //   next: data => {
    //     // updateImageUrls(data);
    //     this.ctrls = data;
    //     // console.log("Dados carregados:", data);
    //   },
    //   error: err => console.error(err),
    //   complete: () => console.log("HTTP completo")
    // });

    //  this.ctrls = this.route.snapshot.data['filtros'];

      // 1️⃣ dados iniciais do resolver
    this.route.data.subscribe(data => {
      this.filtros = data['filtros'];
    });

    // 2️⃣ escuta mudança de dashboard
    this.dashboardService.dashboardId$
      .subscribe(id => {

        if (!id) return;

        this.carregarDashboard(id);

      });

  }

    // 3️⃣ recarrega dados
  carregarDashboard(id: number) {

    this.filtroServiceApi
      .carregarDados(id)
      .subscribe(filtros => {

        this.filtros = filtros;

      });

  }

   trackFiltro(index: number, item: FilterCat) {
    return item.id;
  }


  // get filtros(): FilterCat[] {

  //   return this.ctrls ?? [];
  // }

  toggleTheme(): void {
    this.temaService.toggleTheme();
  }

}


