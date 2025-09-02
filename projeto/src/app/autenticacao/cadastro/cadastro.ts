/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../Services/cadastro-service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {

  cadastroFrom!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) { }
  ngOnInit(): void {
  this.cadastroFrom = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });  }

  cadastro() {
    if (this.cadastroFrom.valid) {
      const email = this.cadastroFrom.value.email;
      this.cadastroService.RegistrarUsuario(email).subscribe({
        next: (res) => {
          console.log('Status:', res.status); // 200, 409, etc
          console.log('Mensagem:', res.body); // string retornada
        },
        error: (err) => {
          console.error('Erro:', err);
        }
      }
      );
    }
  }
}
