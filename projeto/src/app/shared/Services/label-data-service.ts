import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelDataService {

  private tipoDataSubject = new BehaviorSubject<string>('');
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

}
