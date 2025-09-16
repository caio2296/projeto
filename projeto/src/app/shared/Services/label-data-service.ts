import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from './LocaleService';
import { DateAdapter } from '@angular/material/core';


@Injectable({
  providedIn: 'root'
})
export class LabelDataService {

  private tipoDataSubject = new BehaviorSubject<string>('');
  private dateReordered = false;

  tipoData$ = this.tipoDataSubject.asObservable(); // Exposição do observable

private intervaloSubject = new BehaviorSubject<boolean>(false);

   calendarModeSubJect = new BehaviorSubject<string>('day');
   calendarMode$ = this.calendarModeSubJect.asObservable();

  private labelSubject = new BehaviorSubject<string>('');
  label$ = this.labelSubject.asObservable();

  public setTipoData(tipo: string) {
    this.tipoDataSubject.next(tipo);
  }

  public getTipoData(): string {
    return this.tipoDataSubject.value;
  }

  public setLabel(labelData: string) {
    this.labelSubject.next(labelData);
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

  public setCalendarMode(mode:string){
       
    this.calendarModeSubJect.next(mode);
  }

  public getCalendarMode():string{
    return this.calendarModeSubJect.value;
  }

  public AlterarLocalizacao(lang: string,localeService:LocaleService,dateAdapter:DateAdapter<Date>){
     if (lang === 'en-US') {
       if(this.getCalendarMode()=="day" && !this.dateReordered ){
          const partes=this.getLabel().split('/');
          this.setLabel(`${partes[1]}/${partes[0]}/${partes[2]}`);
          this.dateReordered = true;
         }
         dateAdapter.setLocale('en-US'); // inglês
         localeService.setLocale('en-US');
        
      } else {
        if(this.dateReordered ){
           const partes=this.getLabel().split('/');
          this.setLabel(`${partes[1]}/${partes[0]}/${partes[2]}`);
        }
         dateAdapter.setLocale('pt-BR'); // português
         localeService.setLocale('pt-BR');
         this.dateReordered = false;
      }
  }

}
