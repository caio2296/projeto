import { Component, input, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateHelperService } from '../../Services/dateHelperService';
import { CalendarFormService } from '../../Services/calendarFormService';

@Component({
  selector: 'app-seletor-ano',
  standalone: false,
  templateUrl: './seletor-ano.html',
  styleUrl: './seletor-ano.scss'
})
export class SeletorAno implements OnInit {
@Input() form!: FormGroup
@Input() label: string = '';
@Input() calendarMode: 'year' | 'fiscalYear' = 'year';


constructor( protected dateHelperServices:DateHelperService, protected calendarFormServices:CalendarFormService) {

}
  ngOnInit(): void {
  }
}
