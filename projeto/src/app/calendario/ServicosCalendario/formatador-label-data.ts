/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { LabelDataService } from './label-data-service';


@Injectable({
  providedIn: 'root'
})
export class FormatadorLabelData {

   private label = '';

  constructor(private labelDataService: LabelDataService) { }

  
  public atualizarDataLabel(label: string): string {
    if (label.toString().includes("/") && !label.toString().includes("-")) {
      const partes = label.split('/');
      if (partes.length !== 3) {
        // this.label = label; // fallback se o formato estiver errado
        return label;
      }
      this.label = this.labelDataService.getLabel();
    } else if (!label.toString().includes("/") && !label.toString().includes("-")) {
      return this.labelDataService.getLabel();
    }
    return label;
  }

  public atualizarDataLabelIntervalo(label: string, locale: string): string {

    if (label.toString().includes("/") && label.toString().includes("-")) {
      const partes = this.labelDataService.getLabel().toString().split(/[-/]/);
      if (partes.length == 6) {

        return this.atualizaIntervaloDATA(partes, locale);

      } else if (partes.length == 4) {

        // 🔹 Reagrupa de 3 em 3 → [['03','09','2025'], ['17','09','2025']]
        return this.atualizaIntervaloMesAno(partes, locale);
      }

    } else if (!this.label.toString().includes("-") || (this.label.toString().includes("/"))) {

      return this.atualizaIntervaloAno();
    }
    return "erro!";

  }

  private atualizaIntervaloAno(): string {

    const partes = this.labelDataService.getLabel().toString().split("-");
    if (partes.length == 2) {
      console.log("ano", partes);
      return `${partes[0]}-${partes[1]}`;
    }
    return '';
  }

  private atualizaIntervaloMesAno(partes: string[], locale: string) {
    const datasAgrupadas = [
      partes.slice(0, 2),
      partes.slice(2, 4)
    ];

    const formattedParts = datasAgrupadas.map(dateArray => {
      const [m, y] = dateArray.map(p => p.trim());

      return locale === 'en-US'
        ? `${m}/${y}` // mm/yyyy
        : `${m}/${y}`; //mm/yyyy
    });
    return formattedParts.join(' - ');
  }

  private atualizaIntervaloDATA(partes: string[], locale: string) {
    console.log(partes);

    const datasAgrupadas = [
      partes.slice(0, 3), // ["02","09","2025"]
      partes.slice(3, 6) // ["08","09","2025"]
    ];

    const datas = datasAgrupadas.map(([a, b, c]) => {
      let d: number, m: number, y: number;

      if (locale === 'en-US') {
        if (+a > 12) { // dd/MM/yyyy
          d = +a; m = +b; y = +c;
        } else if (+b > 12) { // MM/dd/yyyy
          m = +a; d = +b; y = +c;
        } else { // ambíguo → assume dd/MM/yyyy
          if (this.labelDataService.getDateLocale() == 'en-US') {
            d = Number.parseInt(b); m = Number.parseInt(a); y = Number.parseInt(c); // mm/dd/yyyy

          } else {
            d = Number.parseInt(a); m = Number.parseInt(b); y = Number.parseInt(c); // dd/mm/yyyy
          }
        }

      } else {
        if (+a > 12) { // dd/MM/yyyy
          d = +a; m = +b; y = +c;
        } else if (+b > 12) { // MM/dd/yyyy
          m = +a; d = +b; y = +c;
        } else { // ambíguo → assume dd/MM/yyyy

          if (this.labelDataService.getDateLocale() == 'en-US') {
            d = Number.parseInt(b); m = Number.parseInt(a); y = Number.parseInt(c); // mm/dd/yyyy

          } else {
            d = Number.parseInt(a); m = Number.parseInt(b); y = Number.parseInt(c); // dd/mm/yyyy
          }

        }
      }
      return new Intl.DateTimeFormat(locale).format(new Date(y, m - 1, d));
    });

    console.log("✔ formatado:", this.label, locale);
    return `${datas[0]} - ${datas[1]}`;
  }



}
