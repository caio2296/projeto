/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog implements AfterViewInit, OnInit {
 constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
campos: { chave: string, headerKey: string,valor: any }[] = [];


private headerMap: Record<string, string> = {
  id: 'Dashboard.TabelaHeader.Id',
  descricao: 'Dashboard.TabelaHeader.Descricao',
  tamanho: 'Dashboard.TabelaHeader.Tamanho',
  cor: 'Dashboard.TabelaHeader.Cor',
};

getCampos(obj: any) {
  return Object.entries(obj).map(([chave, valor]) => ({
    chave,                 // chave original (caso precise)
    valor,                 // valor do objeto
    headerKey: this.headerMap[chave] ?? chave // chave de tradução
  }));
}

  modoGrafico!: 'bar' | 'pie' | 'heatmap' | 'bubble' | 'scatterplot' | 'gauge' | 'line';

  alterarGrafico(modo: typeof this.modoGrafico) {
    this.modoGrafico = modo;
  }

 ngOnInit() {
    // Calcula os campos uma vez
    this.modoGrafico = this.data.mode;
    this.campos = this.getCampos(this.data);
  }

  ngAfterViewInit(): void {

     this.modoGrafico = this.data.mode;
    console.log(this.data);
    // {coluna: 'teste_coluna_filha_2', valores: Array(2)}
    // coluna
    // : 
    // "teste_coluna_filha_2"
    // valores
    // : 
    // Array(2)
    // 0
    // : 
    // {titulo: 'linha de teste', valor: '55'}
    // 1
    // : 
    // {titulo: 'Filho da linha de teste', valor: '22'}
  }


}