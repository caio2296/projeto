/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from '../autenticacao/Services/token-service';
import { UsuarioService } from '../autenticacao/Services/usuarioService';
import { TemaService } from '../shared/nav-bar/Services/tema-service';
import { CalendarBarModelService } from '../shared/Services/calendarBarModel';
import { CalendarFormService } from '../shared/Services/calendarFormService';
import { DateHelperService } from '../shared/Services/dateHelperService';
import { InputConfig } from '../shared/Services/InputConfig';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  

    showFiller = false;

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
  
}
