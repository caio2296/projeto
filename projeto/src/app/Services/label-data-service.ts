import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelDataService {

  private tipoDataSubject = new BehaviorSubject<string>('');
  tipoData$ = this.tipoDataSubject.asObservable(); // Exposição do observable

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

}
