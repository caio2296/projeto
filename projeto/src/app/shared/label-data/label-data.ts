/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LabelDataService } from '../Services/label-data-service';
import { CalendarBarModel } from '../Models/calendarBarModel';

@Component({
  selector: 'app-label-data',
  standalone:false,
  templateUrl: './label-data.html',
  styleUrl: './label-data.scss'
})
export class LabelData implements OnInit, OnDestroy {

 tipo = '';
  label = '';

  private subscriptions = new Subscription();

  constructor(public labelDataService: LabelDataService,  protected calendarBarModel: CalendarBarModel) {}

  ngOnInit(): void {
        const defaultSelection = this.calendarBarModel.dados.calendarBar.defaultSelection.selection as any;
        const calendarMode = defaultSelection;

     this.labelDataService.setTipoData(calendarMode);
    this.labelDataService.setLabel(this.calendarBarModel.dados.calendarBar.defaultSelection.dateStart);


    this.subscriptions.add(
      this.labelDataService.tipoData$.subscribe(tipo => {
        switch(tipo){
          case'day':{
           this.tipo = 'Dia';
           break;
          }
          case'month':{
             this.tipo = 'Mes';
             break;
          }
          case'year':{
            this.tipo = 'Ano';
            break;
          }
          case'fiscalYear':{
            this.tipo = 'Ano fiscal';
            break;
          }
          default:{
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
          console.log(this.label,this.tipo);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Evita vazamento de memória
  }
}
