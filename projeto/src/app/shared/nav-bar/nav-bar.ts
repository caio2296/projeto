/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioDialog } from './calendario-dialog/calendario-dialog';
import { CalendarBarModelService } from '../Services/calendarBarModel';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';
import { TemaService } from './Services/tema-service';
import { Router } from '@angular/router';
import { TokenService } from '../../autenticacao/Services/token-service';
import { TranslocoService } from '@jsverse/transloco';
import { LabelDataService } from '../Services/label-data-service';
import { take } from 'rxjs';
import { LocaleService } from '../Services/LocaleService';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar {

  form!: FormGroup;
  resultadoIntervalo: number | null = null;
  intervaloAtivo = false;

  isMenuOpen = false;

  public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';

  collapsed = signal(false);

  sideNavWidth = computed(() => this.collapsed() ? '250px' : ' 10px');

  activeLang = '';

  currentTipoLabel = ''; // label traduzida que será exibida
  currentTipo = '';       // 'day', 'month', etc.

  private tipoMap: Record<string, string> = {
    Day: 'Dashboard.Label.day',
    Month: 'Dashboard.Label.month',
    Year: 'Dashboard.Label.year',
    FiscalYear: 'Dashboard.Label.fiscalYear'
  };


  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    private dialog: MatDialog,
    protected temaService: TemaService,
    protected router: Router,
    private translocoService: TranslocoService,
    private tokenService: TokenService,
    private labelDataService: LabelDataService,
    private localeService:LocaleService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.activeLang = this.translocoService.getActiveLang(); // pega o idioma ativo atual

    this.labelDataService.tipoData$.subscribe(tipo => {
      this.currentTipo = tipo;

      const key = this.tipoMap[tipo] ?? tipo;
      this.translocoService.selectTranslate(key).pipe(take(1)).subscribe(translated => {
        this.currentTipoLabel = translated;
      });
    });

  }

  AlterarIdioma(lang: string) {
    this.activeLang = lang;
    this.translocoService.setActiveLang(lang);

    this.labelDataService.AlterarLocalizacao(lang,this.localeService,this.dateAdapter);
    // Atualiza o label do tipo atual após mudar o idioma
    const key = this.tipoMap[this.currentTipo] ?? this.currentTipo;

    this.translocoService.selectTranslate(key).pipe(take(1)).subscribe(translated => {
      this.currentTipoLabel = translated;
      this.labelDataService.setTipoData(this.currentTipoLabel);
    });

  }

  toggleTheme(): void {
    this.temaService.toggleTheme();
  }

  abrirDialogCalendario(): void {
    this.dialog.open(CalendarioDialog, {
      width: '100%',
      maxWidth: '500px',
      data: {} // pode passar dados se quiser
    });
  }

  public setCalendarMode(mode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime') {
    if (!this.calendarBarModelService.dados.calendarBar[mode]?.visible) {
      return;
    }
    this.intervaloAtivo = false;
    this.calendarMode = mode;
  }

  public MudarTipoFormulario(): boolean {
    return this.intervaloAtivo = true;
  }

  get isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  get logado(): boolean {
    return this.tokenService.possuiToken();
  }

  // Retorna true se está na página de cadastro
  get isCadastroPage(): boolean {
    return this.router.url === '/cadastro';
  }

  get isDashboardPage(): boolean {
    return this.router.url === '/auth/dashboard';
  }

}
