/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../Services/cadastro-service';
import { Usuarios } from '../../shared/Models/type';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {

  cadastroFrom!: FormGroup;

  displayedColumns: string[] = [];
  dataSource: Usuarios[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.cadastroFrom = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

    this.cadastroService.ListarUsuario().subscribe({
      next: (res) => {
        this.dataSource = res;
        if (res.length > 0) {
          this.displayedColumns = Object.keys(res[0]);
          this.displayedColumns.push('acao');
        }
      },
      error: (err) => console.error("Erro ao carregar Usuarios:", err)
    });

  }

  cadastro() {
    if (this.cadastroFrom.valid) {
      const email = this.cadastroFrom.value.email;
      this.cadastroService.RegistrarUsuario(email).subscribe({
        next: (res) => {
          console.log('Status:', res.status); // 200, 409, etc
          console.log('Mensagem:', res.body); // string retornada
          // this.cadastroFrom = this.formBuilder.group({
          //   email: [null, [Validators.required, Validators.email]]
          // });

           // reseta o formulário
        this.cadastroFrom.reset();

        // recarrega do back
        this.cadastroService.ListarUsuario().subscribe({
          next: (res) => {
            this.dataSource = res;
          },
          error: (err) => console.error("Erro ao recarregar lista:", err)
        });
        },
        error: (err) => {
          console.error('Erro:', err);
        }
      }
      );
    }

  }

  deletarItem(element: any): void {
    // Confirmação simples (pode ser substituída por dialog Angular Material)
    const confirmacao = confirm(`Deseja realmente deletar o item: ${element.descricao}?`);

    if (confirmacao) {
      // Remove do dataSource
      this.dataSource = this.dataSource.filter(item => item.id !== element.id);

      console.log(element.id);
      this.cadastroService.DeletarUsuario(element.id).subscribe({
        next: () => console.log("Usuario deletado com sucesso"),
        error: err => console.error("Erro ao deletar Usuario:", err)
      });

    }
  }
}
