import { ChangeDetectorRef, Component, DOCUMENT, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioDialog } from './calendario-dialog/calendario-dialog';
import { CalendarBarModel } from '../Models/calendarBarModel';
import { CalendarFormService } from '../Services/calendarFormService';
import { DateHelperService } from '../Services/dateHelperService';
import { InputConfig } from '../Services/InputConfig';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss'
})
export class NavBar implements OnInit {
  
 form!: FormGroup;
  resultadoIntervalo: number | null = null;
  intervaloAtivo = false;

  inputConfig = {
    type: 'data',
    min: '',
    max: ''
  };

  isMenuOpen = false;

  public calendarMode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime' = 'day';

   isDarkMode = false;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef,
    protected calendarBarModel: CalendarBarModel,
    protected dateHelperServices: DateHelperService,
    protected calendarFormService: CalendarFormService,
    protected inputConfings: InputConfig,
    private dialog: MatDialog,
    private renderer: Renderer2,
     @Inject(DOCUMENT) private document: Document) {
    ;

  }
  ngOnInit(): void {
        const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
      this.setDarkTheme(true);
    }
  }


    abrirDialogCalendario(): void {
    this.dialog.open(CalendarioDialog, {
      width: '100%',
      maxWidth: '500px',
      data: {} // pode passar dados se quiser
    });
  }
  
    // toggleMenu() {
    //   this.isMenuOpen = !this.isMenuOpen;
    // }
    public setCalendarMode(mode: 'day' | 'month' | 'year' | 'fiscalYear' | 'week' | 'datetime') {
      if (!this.calendarBarModel.dados.calendarBar[mode]?.visible) {
        return;
      }
      this.intervaloAtivo = false;
      this.calendarMode = mode;
    }
  
    public MudarTipoFormulario(): boolean {
      return this.intervaloAtivo = true;
    }

    toggleTheme(): void {
    this.setDarkTheme(!this.isDarkMode);
  }

  private setDarkTheme(isDark: boolean): void {
    this.isDarkMode = isDark;
    const body = this.document.body;

    if (isDark) {
      this.renderer.addClass(body, 'dark-theme');
      this.renderer.removeClass(body, 'light-theme');
      localStorage.setItem('tema', 'dark');
    } else {
            this.renderer.addClass(body, 'light-theme');
      this.renderer.removeClass(body, 'dark-theme');
      localStorage.setItem('tema', 'light');
    }
  }
}
