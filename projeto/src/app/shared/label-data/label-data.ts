/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LabelDataService } from '../Services/label-data-service';
import { CalendarBarModelService } from '../Services/calendarBarModel';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-label-data',
  standalone: false,
  templateUrl: './label-data.html',
  styleUrl: './label-data.scss'
})
export class LabelData implements OnInit, OnDestroy {

  tipo = '';
  label = '';
  //  dados!: CalendarModel;
  currentTipoLabel = ''; 

  private subscriptions = new Subscription();

  constructor(public labelDataService: LabelDataService, protected calendarBarModelService: CalendarBarModelService,private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.calendarBarModelService.carregarDados().subscribe(data => {
      const defaultSelection = data.calendarBar.defaultSelection.selection as any;

      const calendarMode = defaultSelection;

      this.labelDataService.setTipoData(calendarMode);
      this.labelDataService.setLabel(data.calendarBar.defaultSelection.dateStart);


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
      this.labelDataService.label$.subscribe(label => {
        this.label = label;
      })
    );

    // this.ApiService.chamarApi();
    console.log(this.label, this.tipo);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Evita vazamento de memória
  }
}
