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
import { UsuarioService } from '../../autenticacao/Services/usuarioService';
import { TokenService } from '../../autenticacao/Services/token-service';

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

  sideNavWidth = computed(()=> this.collapsed()? '250px':' 10px'); 



  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModelService: CalendarBarModelService,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    private dialog: MatDialog,
    protected temaService: TemaService,
    protected router: Router,
    protected userService: UsuarioService,
    private tokenService: TokenService
    ) {

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

    logout() {
    // remover token
    this.userService.logout();

    // redirecionar para login
    this.router.navigate(['/login']);
  }

   get isAdmin(): boolean {
    return this.tokenService.isAdmin();
  }

  // Retorna true se está na página de cadastro
  get isCadastroPage(): boolean {
    return this.router.url === '/cadastro';
  }

  get isDashboardPage():boolean{
    return this.router.url === '/auth/dashboard';
  }

}
