/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LabelDataService } from '../Services/label-data-service';

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

  constructor(public labelDataService: LabelDataService) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Evita vazamento de memória
  }
}
