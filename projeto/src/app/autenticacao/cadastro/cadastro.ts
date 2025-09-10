/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/prefer-inject */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../Services/cadastro-service';
import { Usuarios } from '../../shared/Models/type';
import { DialogConfirmeDelete } from '../../shared/tabela/dialog-confirme-delete/dialog-confirme-delete';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.cadastroFrom = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

    this.ListarUsuarios();

  }

  cadastro() {
    if (this.cadastroFrom.valid) {
      const email = this.cadastroFrom.value.email;
      this.cadastroService.RegistrarUsuario(email).subscribe({
        next: (res) => {
          console.log('Status:', res.status); // 200, 409, etc
          console.log('Mensagem:', res.body); // string retornada

           // reseta o formulário
        this.cadastroFrom.reset();

        // recarrega do back
         this.ListarUsuarios();
        },
        error: (err) => {
          console.error('Erro:', err);
        }
      }
      );
    }

  }

  deletarItem(element: any): void {

    const dialogRef = this.dialog.open(DialogConfirmeDelete, {
        data: { mensagem: `Deseja realmente deletar esse usuário: ${element.email}?` }
      });

      dialogRef.afterClosed().subscribe(confirmado => {
    if (confirmado) {
      this.dataSource = this.dataSource.filter(item => item.id !== element.id);
      this.cadastroService.DeletarUsuario(element.id).subscribe({
        next: () => console.log("Usuario deletado com sucesso"),
        error: err => console.error("Erro ao deletar Usuario:", err)
      });
    }
  });
  }

    private ListarUsuarios() {
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
}
