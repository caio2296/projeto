/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  currentImage!: string;


   ngOnInit() {
    this.currentImage = this.ctrl.imageurl;
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
