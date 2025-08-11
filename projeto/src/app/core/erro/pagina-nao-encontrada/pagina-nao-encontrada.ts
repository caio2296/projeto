/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: false,
  templateUrl: './pagina-nao-encontrada.html',
  styleUrl: './pagina-nao-encontrada.scss'
})
export class PaginaNaoEncontrada implements OnInit {


  contador = 5;

   constructor(private router: Router) {}

    ngOnInit(): void {
    const intervalo = setInterval(() => {
    this.contador--;
    if (this.contador === 0) {
      clearInterval(intervalo);
      this.router.navigate(['/']);
    }
  }, 1000);
  }

}
