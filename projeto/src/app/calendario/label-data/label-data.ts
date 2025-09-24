/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, distinctUntilChanged, Subscription } from 'rxjs';
import { LabelDataService } from '../ServicosCalendario/label-data-service';

import { TranslocoService } from '@jsverse/transloco';
import { LocaleService } from '../ServicosCalendario/LocaleService';
import { CalendarBarModelService } from '../ServicosCalendario/calendarBarModel';
import { FormatadorLabelData } from '../ServicosCalendario/formatador-label-data';

@Component({
  selector: 'app-label-data',
  standalone: false,
  templateUrl: './label-data.html',
  styleUrl: './label-data.scss'
})
export class LabelData implements OnInit, OnDestroy {

  tipo = '';
  private _label = '';
  IniciouEn = false;

  currentTipoLabel = '';

  private subscriptions = new Subscription();

  constructor(public labelDataService: LabelDataService, protected calendarBarModelService: CalendarBarModelService, private translocoService: TranslocoService,
    private localeService: LocaleService, private formatadorLabeData: FormatadorLabelData
  ) { }

  // Getter
  get label() {
    return this._label;
  }

  // Setter
  set label(value: string) {
    console.log('label alterado para:', value);
    console.trace(); // mostra a pilha de chamadas
    this._label = value;
  }
  ngOnInit(): void {
    this.calendarBarModelService.carregarDados().subscribe(data => {
      const defaultSelection = data.calendarBar.defaultSelection.selection as any;

      const calendarMode = defaultSelection;

      this.labelDataService.setTipoData(calendarMode);
      // this.labelDataService.setLabel(data.calendarBar.defaultSelection.dateStart);


      if (this.localeService.getLocale() === "en-US") {

        const partesPadrao = data.calendarBar.defaultSelection.dateStart.split('/');

        this.labelDataService.setLabel(`${partesPadrao[1]}/${partesPadrao[0]}/${partesPadrao[2]}`);
        this.IniciouEn = true;
        this.labelDataService.TipoInicioLabel(this.IniciouEn);
        // 🔹 já normaliza o label inicial aqui
        const partes = this.labelDataService.getLabel().split('/');
        this.label = `${partes[0]}/${partes[1]}/${partes[2]}`; // mm/dd/yyyy
        // this.labelDataService.setLabel(this.label);

        console.log("inicio com ingles", this.localeService.getLocale(), data.calendarBar.defaultSelection.dateStart, `${partesPadrao[1]}/${partesPadrao[0]}/${partesPadrao[2]}`);

      } else {

        this.IniciouEn = false;
        this.labelDataService.TipoInicioLabel(this.IniciouEn);
        const partes = data.calendarBar.defaultSelection.dateStart.split('/');
        this.label = `${partes[0]}/${partes[1]}/${partes[2]}`; // dd/mm/yyyy
        this.labelDataService.setLabel(this.label);
        console.log("inicio bom portugues");

      }


      // this.labelDataService.AlterarLocalizacao(this.localeService.getLocale());

    });


    this.subscriptions.add(
      this.labelDataService.tipoData$.subscribe(tipo => {
        switch (tipo) {
          case 'day': {
            const mensagem = this.translocoService.translate('Dashboard.Label.day');

            this.tipo = mensagem;
            break;
          }
          case 'month': {
            const mensagem = this.translocoService.translate('Dashboard.Label.month');
            this.tipo = mensagem;
            break;
          }
          case 'year': {
            const mensagem = this.translocoService.translate('Dashboard.Label.year');
            this.tipo = mensagem;
            break;
          }
          case 'fiscalYear': {
            const mensagem = this.translocoService.translate('Dashboard.Label.fiscalYear');
            this.tipo = mensagem;
            break;
          }
          default: {
            this.tipo = tipo;
            break;
          }
        }

      })
    );

    this.subscriptions.add(

      combineLatest([
        this.labelDataService.label$.pipe(),
        this.localeService.locale$.pipe(distinctUntilChanged()),
      ]).subscribe(([label, locale]) => {
        if (!label) return;

        if (label.toString().includes("/") && !label.toString().includes("-") || (!label.toString().includes("/") && !label.toString().includes("-"))) {
          this.label = this.formatadorLabeData.atualizarDataLabel(label);
        } else if (label.toString().includes("/") && label.toString().includes("-") || (!this.label.toString().includes("-") || (this.label.toString().includes("/")))) {
          this.label = this.formatadorLabeData.atualizarDataLabelIntervalo(label, locale);
        }
        this.labelDataService.TipoInicioLabel(this.IniciouEn);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Evita vazamento de memória
  }
}