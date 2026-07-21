/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ElementRef, ViewChild, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Chart } from 'chart.js/auto';
import { TemaService } from '../nav-bar/Services/tema-service';
import { LabelDataService } from '../../calendario/ServicosCalendario/label-data-service';
import { GraficoTipoService } from './grafico-tipo-Service';




@Component({
    selector: 'app-grafico',
    standalone: false,
    templateUrl: './grafico.html',
    styleUrl: './grafico.scss'
})
export class Grafico implements OnInit, OnChanges, AfterViewInit {

    @ViewChild('chartContainer')
    container!: ElementRef<HTMLDivElement>;

    @Input() mode: 'bar' | 'pie' | 'gauge' | 'bubble' | 'heatmap' | 'scatterplot' | 'line' = 'bar';
    @Input() data!: {
        coluna: string;
        valores: {
            titulo: string;
            valor: string;
        }[];
    }; // Dados para o gráfico, você pode definir o tipo conforme necessário

    // inserir aqui os daodos vindos de fora para desenhar o grafico:
    // 1 os dados da tabela;
    // 2 dados do calendário para medição de tempo;

    private chart?: Highcharts.Chart;

    private destroyRef = inject(DestroyRef);
    private labelSelecionado = '';


    // aqui será uma chamada para api voltada para o grafico a onde ira pegar dados, e escolher o seu tipo 

    constructor(
        private temaService: TemaService,
        private labelDataService: LabelDataService,
        private graficoTipoService: GraficoTipoService,
    ) { }
    ngOnInit(): void {
        // this.gerarGrafico();
        // this.GraficoLinha();

        console.log("modo do grafico", this.mode);
        this.temaService.themeChanged$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {

                this.atualizarTemaGraficos();

            }); 

        this.labelDataService.label$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(label => {
                this.labelSelecionado = label || 'Sem label';

                if (this.mode === 'line' && this.container?.nativeElement) {
                    this.desenharGrafico();
                }
            });

    }

    ngAfterViewInit(): void {

        console.log("modo do grafico", this.mode);

        this.desenharGrafico();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['mode'] || changes['data']) {

            // espera o Angular criar o novo <div *ngIf>
            setTimeout(() => {
                this.desenharGrafico();

            });

        }
    }

    private TituloDataGrafico(): string {
         const labelOriginal = this.labelSelecionado || this.labelDataService.getLabel() || 'Sem label';
            const labelParaGrafico = String(labelOriginal);
            const labelTipoGrafico = this.labelDataService.getCalendarMode() || 'Sem label';
            const labelPartsDate = labelParaGrafico.split('/').map(part => part.trim()).filter(Boolean);
        
            let labelTitulo = labelParaGrafico;
        
            if (labelPartsDate.length === 3) {
                labelTitulo = `${labelPartsDate[0]}/${labelPartsDate[1]}/${labelPartsDate[2]}`;
            } else if (labelPartsDate.length === 2) {
                labelTitulo = `${labelPartsDate[0]}/${labelPartsDate[1]}`;
            } else {
                labelTitulo = labelParaGrafico;
            }
            return `Linha - ${labelTitulo} - ${labelTipoGrafico}`;
    }

    private obterDadosDataDoLabel() {
            const labelOriginal = this.labelSelecionado || this.labelDataService.getLabel() || 'Sem label';
            const labelParaGrafico = String(labelOriginal);
            const labelPartsDate = labelParaGrafico.split('/').map(part => part.trim()).filter(Boolean);
    
            if (labelPartsDate.length === 3) {
                return {
                    ano: parseInt(labelPartsDate[2], 10),
                    mes: parseInt(labelPartsDate[1], 10) - 1,
                    dia: parseInt(labelPartsDate[0], 10)
                };
            }
    
            if (labelPartsDate.length === 2) {
                return {
                    ano: parseInt(labelPartsDate[1], 10),
                    mes: parseInt(labelPartsDate[0], 10) - 1,
                    dia: 1
                };
            }
    
            return {
                ano: new Date().getFullYear(),
                mes: new Date().getMonth(),
                dia: new Date().getDate()
            };
        }

    private desenharGrafico(): void {
        // a chamada para os dados será feita aqui 
        this.destruirGraficos();

        switch (this.mode) {

            case 'bar':
                this.graficoTipoService.GraficoHightcharts(this.container.nativeElement);
                break;

            case 'pie':
                this.graficoTipoService.GraficoHightchartsPieChart(this.container.nativeElement, this.data);
                break;

            case 'gauge':
                this.graficoTipoService.GraficoHightchartsGaugeChart(this.container.nativeElement);
                break;

            case 'bubble':
                this.graficoTipoService.GraficoHightchartsBubbleChart(this.container.nativeElement);
                break;

            case 'scatterplot':
                this.graficoTipoService.GraficoHightchartsScatterplot(this.container.nativeElement);
                break;

            case 'heatmap':
                this.graficoTipoService.GraficoHightchartsHeatmap(this.container.nativeElement);
                break;
            case 'line':
                this.graficoTipoService.GraficoHightchartsLineChart(this.container.nativeElement,
                     this.TituloDataGrafico(), this.obterDadosDataDoLabel());
                break;
        }
        this.atualizarTemaGraficos();

    }

    private destruirGraficos() {
        this.chart?.destroy();
        this.chart = undefined;
    }

    private atualizarTemaGraficos() {

        this.chart?.update({

            chart: {
                backgroundColor: 'var(--mat-sys-surface)'
            },

            title: {
                style: {
                    color: 'var(--mat-sys-on-surface)'
                }
            }

        });
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
            const ctx = document.getElementById('myChart') as HTMLCanvasElement;

            if (ctx) {
                const valores = [12, 19, 3, 5, 2, 3]; //dados
                const total = valores.reduce((a, b) => a + b, 0);
                // const porcentagens = valores.map(v => ((v / total) * 100).toFixed(2));

                const porcentagens = valores.map(
                    v => parseFloat(((v / total) * 100).toFixed(2))
                );
                const cores = porcentagens.map(p => {

                    if (p < 5) {
                        return 'rgba(255, 99, 132, 0.7)'; // vermelho
                    }

                    if (p < 15) {
                        return 'rgba(255, 206, 86, 0.7)'; // amarelo
                    }

                    return 'rgba(75, 192, 192, 0.7)'; // verde
                });

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], // pegar as data e ser ym array dos ultimos 7 dias (depois criar um controlador de quantidades de array)
                        datasets: [{
                            label: '% de votos',
                            data: porcentagens,
                            backgroundColor: cores,
                            borderColor: cores,
                            hoverBackgroundColor: 'rgba(0, 0, 0, 0.9)',
                            hoverBorderColor: 'rgba(255, 255, 255, 0.7)',
                            hoverBorderWidth: 1,
                            borderWidth: 1,
                            borderRadius: 20
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                    callback: (tickValue) => `${tickValue}%` // da o valor no eixo y
                                },

                                title: {
                                    display: true,
                                    text: 'Coluna teste'
                                }
                            }
                        },
                        // indexAxis: 'y', // deixa o grafico na horizontal, para voltar na vertical basta comentar
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
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
