/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-separator',
  standalone: false,
  templateUrl: './filter-separator.html',
  styleUrl: './filter-separator.scss'
})
export class FilterSeparator {

    @Input() ctrl: any = {}; // caso futuramente queira receber algo do servidor
}
