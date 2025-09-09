/* eslint-disable @angular-eslint/prefer-inject */
import { DOCUMENT, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private renderer: Renderer2;
  public isDarkMode = false;

  constructor(private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document) {

    this.renderer = rendererFactory.createRenderer(null, null);
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
      this.setDarkTheme(true);
    }
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
