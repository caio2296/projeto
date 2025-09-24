import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private localeSubject = new BehaviorSubject<string>('pt-BR');
  locale$ = this.localeSubject.asObservable();

  setLocale(locale: string) {
             console.log("muda");

    this.localeSubject.next(locale);
  }

  getLocale() {
    return this.localeSubject.value;
  }
}
