import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

   private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // loading$ = this.loadingSubject.asObservable();

   // 👇 estabiliza emissões
  loading$ = this.loadingSubject
    .asObservable()
    .pipe(
      distinctUntilChanged()
    );

 private showTimeout?: number;

    show() {
      this.loadingCount++;

      if (this.loadingCount === 1) {
        this.showTimeout = setTimeout(() => {
          this.loadingSubject.next(true);
          document.body.style.overflow = 'hidden';
        }, 150);
      }
    }

 hide() {
  if (this.loadingCount > 0) {
    this.loadingCount--;
  }

  if (this.loadingCount === 0) {
    clearTimeout(this.showTimeout);

    this.loadingSubject.next(false);
    document.body.style.overflow = 'auto';
  }
}

}
