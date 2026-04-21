/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, EventEmitter, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { OnDestroy, inject, signal } from '@angular/core';
import { UsuarioService } from '../../../autenticacao/Services/usuarioService';
import { Router } from '@angular/router';
import { DashboardService } from '../../../dashboard/Service/DashboardService';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar implements OnDestroy {

  @Output() deslogou = new EventEmitter<void>(); // <<< evento para o NavBar

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(protected userService: UsuarioService, protected router: Router, private dashboardService: DashboardService) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

abrirInicial(){
  this.router.navigate(['auth/dashboard', 1]);
      // emitir evento pro NavBar
    this.deslogou.emit();
}

abrirConsumo() {
  this.router.navigate(['auth/dashboard', 2]);
      // emitir evento pro NavBar
    this.deslogou.emit();
}

  logout() {
    // remover token
    this.userService.logout();

    // emitir evento pro NavBar
    this.deslogou.emit();

    // redirecionar para login
    this.router.navigate(['/login']);
  }
}
