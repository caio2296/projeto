/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-filter-image',
  standalone: false,
  templateUrl: './filter-image.html',
  styleUrl: './filter-image.scss'
})
export class FilterImage implements OnInit {

  @Input() ctrl: any;        // Objeto com os dados (css, caption, imageurl...)
  @Input() data: any;        // Para usar no redirect ou changeStatus
  @Output() clickAction = new EventEmitter<void>();

  translatedCaption = '';

  currentImage!: string;

  /**
   *
   */
  constructor(private translocoService: TranslocoService) {
    
  }

  private toTranslocoKey(caption: string): string {
  return 'Filtro.img.Captions.' +
    caption
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/\s+/g, '_') // substitui espaços por _
      .replace(/[^a-zA-Z0-9_]/g, ''); // remove caracteres especiais
}


   ngOnInit() {
    this.currentImage = this.ctrl.imageurl;
      const key = this.toTranslocoKey(this.ctrl.caption);
      this.translocoService.selectTranslate(key).subscribe(value => {
        this.translatedCaption = value;
      });
  }

   onMouseOut(){
      this.currentImage = this.ctrl.imageurl;
}

onMouseOver(){
   this.currentImage = this.ctrl.imageoverurl;
}

   onClick() {
    if (this.ctrl.value === null || this.ctrl.value === '-') {
      // dispara ação da própria imagem
      this.clickAction.emit();
      console.log(this.ctrl.action);
    } else {
      // chama o método que existia no jQuery
      if (this.data?.redirectTo) {
        // aqui você replica o comportamento:
        // methods._changeStatusBtn(data.redirectTo, ctrl.action, ctrl.value);
        console.log('executar changeStatus com:', {
          redirect: this.data.redirectTo,
          action: this.ctrl.action,
          value: this.ctrl.value
        });
      }
    }
}


}
