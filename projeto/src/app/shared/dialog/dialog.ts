/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dialog',
  standalone: false,
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog implements AfterViewInit {
 constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
campos: { chave: string, valor: any }[] = [];

getCampos(obj: any): { chave: string, valor: any }[] {

  return Object.entries(obj).map(([chave, valor]) => ({ chave, valor }));
}
 ngOnInit() {
    // Calcula os campos uma vez
    this.campos = this.getCampos(this.data);
  }

  ngAfterViewInit(): void {

    console.log(this.data);
    this.gerarGrafico();
  }

  gerarGrafico() {
  //   if (typeof document !== 'undefined') {
  //     const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  //     if (ctx) {
  //       const myChart = new Chart(ctx, {
  //         type: 'bar',
  //         data: {
  //           labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //           datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             borderWidth: 1
  //           }]
  //         },
  //         options: {
  //           scales: {
  //             y: {
  //               beginAtZero: true
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       console.error("Canvas com id 'myChart' não encontrado.");
  //     }
  //   }

  if (typeof document !== 'undefined') {
  const ctx = document.getElementById('myChart1') as HTMLCanvasElement;

  if (ctx) {
    const valores = [12, 19, 3, 5, 2, 3];
    const total = valores.reduce((a, b) => a + b, 0);
    const porcentagens = valores.map(v => ((v / total) * 100).toFixed(2));

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '% de votos',
          data: porcentagens,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
                callback: (tickValue) => `${tickValue}%`
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.parsed.y + '%';
              }
            }
          }
        }
      }
    });
  } else {
    console.error("Canvas com id 'myChart' não encontrado.");
  }
}
  }

}