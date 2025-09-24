/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from './LocaleService';
import { DateAdapter } from '@angular/material/core';


@Injectable({
  providedIn: 'root'
})
export class LabelDataService {

  private tipoDataSubject = new BehaviorSubject<string>('');
  public dateReordered = false;

  Inicio = false;


  tipoData$ = this.tipoDataSubject.asObservable(); // Exposição do observable

  private intervaloSubject = new BehaviorSubject<boolean>(false);

  calendarModeSubJect = new BehaviorSubject<string>('day');
  calendarMode$ = this.calendarModeSubJect.asObservable();

  private labelSubject = new BehaviorSubject<string>('');
  label$ = this.labelSubject.asObservable();


  private _DateLocale!: string;


  public setTipoData(tipo: string) {
    this.tipoDataSubject.next(tipo);
  }

  public getTipoData(): string {
    return this.tipoDataSubject.value;
  }

  public setLabel(labelData: string, locale?: string) {
    //  console.log("setLabel chamado com:", labelData);
    // console.trace(); // mostra a pilha de chamadas
    // console.log("testando", labelData);

    // se não passar locale, usa pt-BR como padrão
    const effectiveLocale = locale ?? 'pt-BR';
    this._DateLocale = effectiveLocale;
    this.labelSubject.next(labelData);

  }

  public getDateLocale(): string {
    return this._DateLocale;
  }

  public getLabel(): string {
    return this.labelSubject.value;
  }

  public getInterval(): boolean {
    return this.intervaloSubject.value;
  }

  public setInterval(valor: boolean): void {
    this.intervaloSubject.next(valor);
  }

  public setCalendarMode(mode: string) {

    this.calendarModeSubJect.next(mode);
  }

  public getCalendarMode(): string {
    return this.calendarModeSubJect.value;
  }

  public TipoInicioLabel(inicio: boolean) {
    this.Inicio = inicio;
  }

  public getTipoInicioLabel(): boolean {
    return this.Inicio;
  }

  public AlterarLocalizacao(lang: string, localeService: LocaleService, dateAdapter: DateAdapter<Date>) {
    if (lang == 'en-US') {
      this.TrocaFormatadoDataLabelEnUs(lang, dateAdapter, localeService);

    } else {
      if (this.dateReordered) {
        this.TrocaFormatoDataLabelPadrao(lang, dateAdapter, localeService);

      }
    }
  }

  public TrocaFormatoDataLabelPadrao(lang: string, dateAdapter: DateAdapter<Date, any>, localeService: LocaleService) {
    if (this.getLabel().toString().includes("-")) {
      // se o label possui o "-" logo e um intervalo
      const partes = this.getLabel().split(/[-/]/);
      if (partes.length == 6) {
        //ver se e um intervalo de 2 datas com dia mes e ano
        const datasAgrupadas = [
          partes.slice(0, 3),
          partes.slice(3, 6)
        ];

        const formattedParts = datasAgrupadas.map(dateArray => {
          const [d, m, y] = dateArray.map(p => p.trim());

          if (this.getDateLocale() == 'en-US') {
            return lang != 'en-US'
              ? `${m}/${d}/${y}` // dd/mm/yyyy
              : `${d}/${m}/${y}`; // mm/dd/yyyy
          } else {
            return lang != 'en-US'
              ? `${d}/${m}/${y}` // dd/mm/yyyy
              : `${m}/${d}/${y}`; // mm/dd/yyyy
          }

        });

        this.setLabel(formattedParts.join(' - '));
      }

    } else {

      if (this.getLabel().toString().includes("/")) {
        // se ele tem / 
        // se um ano data comum sem ser intervalo sem o "-"
        if (this.getLabel().split("/").length === 3) {
          // se e uma data completa dia mes e ano
          const partes = this.getLabel().split('/');
          this.setLabel(`${partes[1]}/${partes[0]}/${partes[2]}`);
          this.dateReordered = true;
        } else {
          // e se é uma data mes e ano ou ano fiscal
          const partes = this.getLabel().split('/');
          this.setLabel(`${partes[0]}/${partes[1]}`);
          this.dateReordered = true;

        }
      }
    }
    dateAdapter?.setLocale('pt-BR'); // português
    localeService.setLocale('pt-BR');
    this.dateReordered = false;
  }


  public TrocaFormatadoDataLabelEnUs(lang: string, dateAdapter: DateAdapter<Date, any>, localeService: LocaleService) {
    if (this.getCalendarMode() == "day" && !this.dateReordered) {

      console.log(this.getLabel().split("-"));
      if (this.getLabel().includes("-")) {
        // se o label possui o "-" logo e um intervalo
        const partes = this.getLabel().split(/[-/]/);
        if (partes.length == 6) {
          //ver se e um intervalo de 2 datas com dia mes e ano
          const datasAgrupadas = [
            partes.slice(0, 3),
            partes.slice(3, 6)
          ];

          const formattedParts = datasAgrupadas.map(dateArray => {
            const [d, m, y] = dateArray.map(p => p.trim());

            return lang === 'en-US'
              ? `${d}/${m}/${y}` // dd/mm/yyyy
              : `${m}/${d}/${y}`; // mm/dd/yyyy
          });

          this.setLabel(formattedParts.join(' - '));
          this.dateReordered = true;
        }
        this.dateReordered = true;
      } else {

        if (this.getLabel().includes("/")) {
          // se ele tem / 
          // se um ano data comum sem ser intervalo sem o "-"
          if (this.getLabel().split("/").length === 3) {
            // se e uma data completa dia mes e ano
            const partes = this.getLabel().split('/');
            this.setLabel(`${partes[1]}/${partes[0]}/${partes[2]}`);
            this.dateReordered = true;
          } else {
            // e se é uma data mes e ano ou ano fiscal
            const partes = this.getLabel().split('/');
            this.setLabel(`${partes[0]}/${partes[1]}`);
            this.dateReordered = true;

          }

        } else {

          this.setLabel(this.getLabel());
        }


      }

    }
    this.dateReordered = true;
    dateAdapter?.setLocale('en-US'); // inglês
    localeService.setLocale('en-US');
  }

}
