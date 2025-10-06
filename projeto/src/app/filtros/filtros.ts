/* eslint-disable no-var */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { toolbar } from '../filters/filters_json_export'; // caminho relativo para o arquivo


declare var $: any;

@Component({
  selector: 'app-filtros',
  standalone: false,
  templateUrl: './filtros.html',
  styleUrl: './filtros.scss'
})
export class Filtros implements AfterViewInit {

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  ngAfterViewInit() {

    this.loadScript('https://code.jquery.com/jquery-3.7.1.min.js')
      .then(() => this.loadScript('https://code.jquery.com/ui/1.13.2/jquery-ui.min.js'))
      .then(() => this.loadScript('https://cdn.jsdelivr.net/npm/jquery-ui-multiselect-widget@3.0.0/src/jquery.multiselect.min.js'))
      .then(() => this.loadScript('/SharedComponents/filters/js/jquery.filters_plugin.js'))
      .then(() => this.loadScript('/SharedComponents/exporterBar/js/jquery.exporterBar_plugin.js'))
      .then(() => this.loadScript('/SharedComponents/filters/js/jquery.filters_plugin_1.js'))
      .then(() => {

        // Atualiza todos os imageurl do toolbar
        updateImageUrls(toolbar);


        console.log((window as any).exporterBarOptions);
        console.log(toolbar);

        const globalMethods = (window as any).methods;

        if (globalMethods && typeof globalMethods._renderfilters === 'function') {

          globalMethods._renderfilters(toolbar, ($('#meuFiltroContainer') as any), {});
        } else {
          console.warn('Plugin jQuery não encontrado!');
        }
      })
      .catch(err => console.error('Erro ao carregar scripts', err));


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
