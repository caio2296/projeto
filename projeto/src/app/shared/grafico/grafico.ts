/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafico',
  standalone: false,
  templateUrl: './grafico.html',
  styleUrl: './grafico.scss'
})
export class Grafico implements OnInit {
  ngOnInit(): void {
    this.gerarGrafico();
    this.GraficoLinha();
  }

  gerarGrafico() {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;

      if (ctx) {
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error("Canvas com id 'myChart' não encontrado.");
      }
    }
  }

  GraficoLinha() {
    if (typeof document !== 'undefined') {
      const ctx = document.getElementById('ChartLine') as HTMLCanvasElement;
      if (ctx) {
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
              label: '',
              data: [10, 20, 30, 40, 44, 50, 60, 70, 80, 90, 100, 110],
              borderColor: '#FF0000',
              fill: false
            },
            {
              label: '',
              data: [17, 28, 60, 50, 45, 40, 59, 71, 78, 80, 115, 100],
              borderColor: '#0000FF',
              fill: false
            }]
          },
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },

            plugins: {
              title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',

                // grid line settings
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
              },
            }
          },
        });
      } else {
        console.error("Canvas com id 'myChart' não encontrado.");
      }

    }
  }
}
