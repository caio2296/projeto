/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { toolbar } from '../filters/filters_json_export'; // caminho relativo para o arquivo
import { FiltroServiceApi } from './ServicesFiltro/filtro-service-api';
import { FilterCat, FilterData } from '../calendario/Models/type';


@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss'
})
export class Filtros implements  OnInit {

  // vai virar input depois
  @Input() ctrls: FilterCat | null = null;
  @Input() ctrlsId!: number;
  @Input() data!: FilterData;
  quatFilhos = 0;

  indAux = this.setIndAux() | 0;


  setIndAux(): number {

    if (this.indAux < 10) {
      this.indAux = this.indAux + 1;
    }
    return this.indAux;
  }


  constructor(protected filtroServiceApi: FiltroServiceApi) {


  }
  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }


  ngOnInit() {

    console.log("fui chamado");
    // 1) Primeiro buscar os dados
    this.filtroServiceApi.carregarDados(this.ctrlsId).subscribe({
      next: data => {
        updateImageUrls(data);
        this.ctrls = data;
        console.log("Dados carregados:", data);
      },
      error: err => console.error(err),
      complete: () => console.log("HTTP completo")
    });
  }
//  ngAfterViewInit()  {
//     // 1) Primeiro buscar os dados
//     this.filtroServiceApi.carregarDados(this.ctrlsId).subscribe({
//       next: data => {
//         updateImageUrls(data);
//         this.ctrls = data;
//         console.log("Dados carregados:", data);
//       },
//       error: err => console.error(err),
//       complete: () => console.log("HTTP completo")
//     });
//   }



  // ngAfterViewInit() {

  //   this.loadScript('https://code.jquery.com/jquery-3.7.1.min.js')
  //     .then(() => this.loadScript('https://code.jquery.com/ui/1.13.2/jquery-ui.min.js'))
  //     .then(() => this.loadScript('https://cdn.jsdelivr.net/npm/jquery-ui-multiselect-widget@3.0.0/src/jquery.multiselect.min.js'))
  //     .then(() => this.loadScript('/SharedComponents/filters/js/jquery.filters_plugin.js'))
  //     .then(() => this.loadScript('/SharedComponents/exporterBar/js/jquery.exporterBar_plugin.js'))
  //     .then(() => this.loadScript('/SharedComponents/filters/js/jquery.filters_plugin_1.js'))
  //     .then(() => {

  //       this.filtroServiceApi.carregarDados(this.ctrlsId).subscribe({

  //         next: (data) => {
  //           updateImageUrls(data);
  //           this.ctrls = data;
  //           if (this.ctrls.children != null && this.ctrls?.children?.length > 0) {
  //             this.quatFilhos = this.ctrls.children?.length;
  //           }

  //           console.log(data);

  //           console.log(toolbar);
  //           console.log(this.ctrls);
  //           const globalMethods = (window as any).methods;

  //           if (globalMethods && typeof globalMethods._renderfilters === 'function') {

  //             globalMethods._renderfilters(data, ($('#meuFiltroContainer') as any), {});
  //           } else {
  //             console.warn('Plugin jQuery não encontrado!');
  //           }
  //         },
  //         error: (ex) => {
  //           console.log(ex.message);
  //         },
  //         complete: () => {
  //           console.log("Requisição completa");
  //         }

  //       });
  //       // Atualiza todos os imageurl do toolbar
  //       // updateImageUrls(toolbar);

  //     })
  //     .catch(err => console.error('Erro ao carregar scripts', err));

  // }

  executarAcao(valor: any) {
    console.log(valor);
    throw new Error(`Function ${valor} not implemented.`);
  }
}

function updateImageUrls(obj: any) {
  if (Array.isArray(obj)) {
    obj.forEach(updateImageUrls);
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if ((key === 'imageurl' || key === 'imageoverurl') && typeof obj[key] === 'string') {
        let filename = obj[key];

        // Pega só o nome do arquivo (último pedaço do caminho)
        filename = filename.split('/').pop() || filename;

        // Gera caminho final correto
        obj[key] = '/SharedComponents/exporterBar/Images/' + filename;
      } else {
        updateImageUrls(obj[key]);
      }
    }
  }
}





