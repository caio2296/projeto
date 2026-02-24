/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, inject } from '@angular/core';
import { LoadingService } from './Service/loading-service';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
    
     private loadingService = inject(LoadingService);

  loading$ = this.loadingService.loading$;

}
