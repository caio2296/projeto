/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, DOCUMENT, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'projeto';

  isDarkMode = false;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
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
