/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

import * as Highcharts from 'highcharts';
import 'highcharts/highcharts-more';
import 'highcharts/themes/adaptive';
import 'highcharts/modules/heatmap';
import 'highcharts/modules/accessibility';
import 'highcharts/modules/exporting';
import 'highcharts/modules/series-label';

@Injectable({
  providedIn: 'root'
})
export class GraficoTipoService {

  private chart?: Highcharts.Chart;


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
      GraficoHightcharts(container: HTMLElement) {

        this.chart = Highcharts.chart(container, {
            chart: {
                type: 'bar',

            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a ' +
                    'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
                    'target="_blank">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe'],
                title: {
                    text: null
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                gridLineWidth: 0
            },
            tooltip: {
                headerFormat: `<div style="display: flex">
            <div>
                <svg width="10" height="30">
                <path d="M 1.5 1.5 L 1.5 28.5" stroke="{series.color}"
                    stroke-width="3" stroke-linecap="round" />
                </svg>
            </div>
            <div>
                <div class="highcharts-header">
                    {point.key}
                </div>`,
                pointFormat: `<span style="color: var(--highcharts-neutral-color-40)">
                {series.name}
            </span>
            <b style="padding-left: 0.5em">{point.y}</b>`,
                footerFormat: '</div>',
                useHTML: true,
                valueSuffix: ' million'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
                borderRadius: 4,
                borderWidth: 1,
                backgroundColor: 'var(--highcharts-background-color, #ffffff)'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    borderRadius: '50%',
                    dataLabels: {
                        enabled: true
                    },
                    groupPadding: 0.1
                }
            },
            series: [{
                name: 'Year 1990',
                data: [732, 727, 3202, 721]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 726]
            }, {
                name: 'Year 2021',
                data: [1393, 1031, 4695, 745]
            }]
        });


    }

    //esse grafico avalia a porcentagem em comparação de dados diferentes quanto em porcentagem um e maior que o outro
    // vejo utilização pra comparar dados de pais com filhos na tabela
    GraficoHightchartsPieChart(container: HTMLElement,dados: any) {

        const seriesData = dados.valores.map((item: any) => [
            item.titulo,
            Number(item.valor.replace(',', '.'))
        ]);
        console.log("dados do grafico pie chart: ", seriesData);

        this.chart = Highcharts.chart(container, {
            chart: {
                type: 'pie'
            },

            title: {
                text: dados.coluna
            },

            palette: {
                light: {
                    colors: [
                        '#014CE5', '#A5AFB6', '#D6DBDE', '#E8EEF1', '#F5FCFF'
                    ]
                },
                dark: {
                    colors: [
                        '#216AFF', '#AABAC4', '#929FA7', '#818C93', '#697278'
                    ]
                }
            },

            tooltip: {
                valueSuffix: '',
                // pointFormat: '<b>{point.percentage:.1f}%</b>'
            },

            series: [{
                name: 'Requests',
                // We can show multiple data labels per point
                dataLabels: [{
                    format: '{point.name}',
                    connectorColor: 'var(--highcharts-neutral-color-80, #333)'
                }, {
                    format: '{point.percentage:.1f}%',
                    backgroundColor: 'contrast',
                    distance: -30, // Placing the label inside
                    style: {
                        fontSize: '0.9em',
                        textOutline: 'none'
                    }
                }],
                data: seriesData
                // [
                //     ['Webform', 55],
                //     ['Call', 17],
                //     ['Email', 7],
                //     ['Webchat', 5],
                //     ['Other', 3]
                // ]
            }]
        });

    }

    GraficoHightchartsGaugeChart(container: HTMLElement) {
        this.chart = Highcharts.chart(container, {
            chart: {
                type: 'gauge'
            },

            title: {
                text: 'Revenue this month'
            },

            // Defines the gauge area
            pane: {
                startAngle: -90,
                endAngle: 90,
                background: [{
                    outerRadius: '100%',
                    innerRadius: '60%',
                    backgroundColor: '#EEE',
                    borderWidth: 0
                }]
            },

            // The value axis
            yAxis: {
                min: 0,
                max: 200000,
                plotBands: [{
                    from: 0,
                    to: 110000,
                    color: 'rgba(128, 128, 128, 0.1)' // gray
                }, {
                    from: 111000,
                    to: 149000,
                    color: '#FFBF00' // yellow
                }, {
                    from: 150000,
                    to: 200000,
                    color: '#00A96B' // green
                }]
            },

            series: [{
                name: 'Revenue',
                data: [80000],
                tooltip: {
                    valuePrefix: '$'
                },
                dataLabels: {
                    format: '${y:,.0f}'
                }
            }]

        });


    }

    GraficoHightchartsBubbleChart(container: HTMLElement) {

        this.chart = Highcharts.chart(container, {

            dataTable: {
                columns: {
                    CountryCode: [
                        'BE', 'DE', 'FI', 'NL', 'SE', 'ES', 'FR', 'NO', 'UK', 'IT',
                        'RU', 'US', 'HU', 'PT', 'NZ'
                    ],
                    CountryName: [
                        'Belgium', 'Germany', 'Finland', 'Netherlands', 'Sweden',
                        'Spain', 'France', 'Norway', 'United Kingdom', 'Italy',
                        'Russia', 'United States', 'Hungary', 'Portugal', 'New Zealand'
                    ],
                    FatIntake: [
                        95, 86.5, 80.8, 80.4, 80.3, 78.4, 74.2, 73.5, 71, 69.2, 68.6,
                        65.5, 65.4, 63.4, 64
                    ],
                    SugarIntake: [
                        95, 102.9, 91.5, 102.5, 86.1, 70.1, 68.5, 83.1, 93.2, 57.6, 20,
                        126.4, 50.8, 51.8, 82.9
                    ],
                    Obesity: [
                        13.8, 14.7, 15.8, 12, 11.8, 16.6, 14.5, 10, 24.7, 10.4, 16,
                        35.3, 28.5, 15.4, 31.3
                    ]
                }
            },
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                plotBorderRadius: 5,
                zooming: {
                    type: 'xy'
                }
            },

            legend: {
                enabled: false
            },

            title: {
                text: 'Sugar and fat intake per country',
                align: 'left'
            },

            subtitle: {
                text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a>' +
                    ' and <a href="https://data.oecd.org/">OECD</a>',
                align: 'left'
            },

            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, ' +
                        'sugar: {point.y}g, obesity: {point.z}%.'
                }
            },

            xAxis: {
                gridLineWidth: 1,
                minPadding: 0.06,
                lineWidth: 3,
                title: {
                    text: 'Daily fat intake'
                },
                labels: {
                    format: '{value} gr'
                },
                plotLines: [{
                    color: 'light-dark(#00b066, #007D49)',
                    dashStyle: 'Dash',
                    value: 65,
                    zIndex: 3
                }],
                plotBands: [{
                    from: 0,
                    to: 65,
                    label: {
                        rotation: 0,
                        verticalAlign: 'top',
                        y: 40,
                        style: {
                            fontStyle: 'italic',
                            color: 'light-dark(#007D49, #00b066)'
                        },
                        text: 'Safe zone'
                    },
                    color: '#00E28424',
                    zIndex: 3
                }],
                accessibility: {
                    rangeDescription: 'Range: 60 to 100 grams.'
                }
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: 'Daily sugar intake'
                },
                labels: {
                    format: '{value} gr'
                },
                maxPadding: 0.2,
                min: 0,
                plotLines: [{
                    color: 'light-dark(#00b066, #007D49)',
                    dashStyle: 'Dash',
                    value: 50,
                    zIndex: 3
                }],
                plotBands: [{
                    from: 0,
                    to: 50,
                    label: {
                        align: 'right',
                        style: {
                            fontStyle: 'italic',
                            color: 'light-dark(#007D49, #00b066)'
                        },
                        text: 'Safe zone',
                        x: -10
                    },
                    color: '#00E28424',
                    zIndex: 3
                }],
                accessibility: {
                    rangeDescription: 'Range: 0 to 160 grams.'
                }
            },

            tooltip: {
                useHTML: true,
                headerFormat: '<table style="border-left: 3px solid {point.color};">',
                pointFormat:
                    '<tr><th colspan="2">{point.custom.countryName}</th></tr>' +
                    '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
                    '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
                    '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
                footerFormat: '</table>',
                followPointer: true
            },

            plotOptions: {
                bubble: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    },
                    minSize: 20
                }
            },

            series: [{
                dataMapping: {
                    x: 'FatIntake',
                    y: 'SugarIntake',
                    z: 'Obesity',
                    name: 'CountryCode',
                    'custom.countryName': 'CountryName'
                },
                colorByPoint: true
            }]

        });

    }

    GraficoHightchartsScatterplot(container: HTMLElement) {
        interface Athlete {
            sport: string;
            weight: number;
            height: number;
            continent: string;
        };

        const series: Highcharts.SeriesScatterOptions[] = [{
            name: 'Triathlon',
            type: 'scatter',
            id: 'triathlon',
            marker: {
                symbol: 'triangle'
            }
        },
        {
            name: 'Volleyball',
            type: 'scatter',
            id: 'volleyball',
            marker: {
                symbol: 'square'
            }
        },
        {
            name: 'Basketball',
            type: 'scatter',
            id: 'basketball',
            marker: {
                symbol: 'circle'
            }
        }];

        async function getData(): Promise<Athlete[]> {
            const response = await fetch(
                'https://www.highcharts.com/samples/data/olympic2012.json'
            );
            return response.json();
        }

        getData().then(data => {
            series.forEach(s => {
                s.data = data
                    .filter(athlete =>
                        athlete.sport === s.id &&
                        athlete.weight > 0 &&
                        athlete.height > 0 &&
                        athlete.continent === 'Europe'
                    )
                    .map(athlete => [athlete.weight, athlete.height]);
            });

            this.chart = Highcharts.chart(container, {
                chart: {
                    type: 'scatter',
                    plotBorderColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
                    plotBorderWidth: 1,
                    plotBorderRadius: 5,
                    zooming: {
                        type: 'xy'
                    }
                },
                title: {
                    text: 'European olympic athletes by height and weight',
                    align: 'left'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.theguardian.com/sport/datablo' +
                        'g/2012/aug/07/olympics-2012-athletes-age-weight-height">The ' +
                        'Guardian</a>',
                    align: 'left'
                },
                xAxis: {
                    labels: {
                        format: '{value} kg'
                    },
                    gridLineWidth: 1,
                    lineWidth: 0,
                    startOnTick: true,
                    endOnTick: true,
                    tickLength: 0
                },
                yAxis: {
                    title: {
                        text: 'Height'
                    },
                    labels: {
                        format: '{value:.1f} m'
                    }
                },
                legend: {
                    enabled: true,
                    padding: 0
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor:
                                        'var(--highcharts-neutral-color-60, #666)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        jitter: {
                            x: 0.005
                        }
                    }
                },
                tooltip: {
                    pointFormat: 'Weight: {point.x} kg <br/> Height: {point.y:.2f} m'
                },
                series
            });

            this.atualizarTemaGraficos();
        }
        );

    }

    GraficoHightchartsHeatmap(container: HTMLElement) {

        const options: Highcharts.Options = {

            chart: {
                type: 'heatmap',
                plotBorderColor: '#0443E1',
                plotBorderWidth: 2,
                plotBorderRadius: 5,
                marginBottom: 25
            },

            title: {
                text: 'Simple heatmap',
                align: 'left'
            },

            subtitle: {
                text: 'Sales per employee per weekday',
                align: 'left'
            },

            xAxis: {
                categories: [
                    'Alexander',
                    'Marie',
                    'Maximilian',
                    'Sophia',
                    'Lukas',
                    'Maria',
                    'Leon',
                    'Anna',
                    'Tim',
                    'Laura'
                ],
                //legenda no eixo X
                opposite: true,
                labels: {
                    autoRotation: [0, -90],
                    style: {
                        fontSize: '0.65em'
                    }
                },
                lineWidth: 1,
                lineColor: '#0443E1'
            },

            yAxis: {
                categories: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday'
                ],

                //legenda no eixo Y
                title: {
                    text: ''
                },
                reversed: true,
                labels: {
                    rotation: -90,
                    style: {
                        fontSize: '0.65em'
                    }
                }
            },

            accessibility: {
                point: {
                    descriptionFormat:
                        '{(add index 1)}. ' +
                        '{series.xAxis.categories.(x)} sales ' +
                        '{series.yAxis.categories.(y)}, {value}.'
                }
            },

            colorAxis: {
                min: -4,
                max: 154,
                startOnTick: false,
                endOnTick: false,
                tickPixelInterval: 50,

                minColor: '#0443E111',
                maxColor: '#0443E1',

                tickColor: '#ffffff',
                tickLength: 0.1,
                tickWidth: 6,
                gridLineWidth: 0,

                marker: {
                    symbol: 'circle',
                    color: 'transparent',
                    lineColor: '#ffffff',
                    lineWidth: 3
                }
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                symbolRadius: 6,
                margin: 0,
                verticalAlign: 'bottom',
                symbolHeight: 270
            },

            tooltip: {
                useHTML: true,
                format:
                    `<div style="border-left:3px solid {point.color}; padding-left:8px;">
                        <b>{series.xAxis.categories.(point.x)}</b> sold
                        <b>{point.value}</b><br>
                        items on
                        <b>{series.yAxis.categories.(point.y)}</b>
                    </div>`,
                padding: 12
            },

            series: [
                {
                    type: 'heatmap',

                    name: 'Sales per employee',

                    borderColor: '#0443E1',

                    borderWidth: 1,

                    data: [
                        [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67],
                        [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48],
                        [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52],
                        [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16],
                        [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115],
                        [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120],
                        [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96],
                        [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30],
                        [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84],
                        [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]
                    ],
                    // [x, y, valor]
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '0.85em'
                        }
                    }

                } as Highcharts.SeriesHeatmapOptions
            ]

        };


        this.chart = Highcharts.chart(container, options);
    }



    GraficoHightchartsLineChart(container: HTMLElement, titulo: string, obterDadosDataDoLabel: any) {
    const { ano, mes, dia } = obterDadosDataDoLabel;

    this.chart = Highcharts.chart(container, {

        chart: {
            type: 'line',
            plotBorderColor: 'var(--highcharts-neutral-color-10, #e6e6e6)',
            plotBorderWidth: 1,
            plotBorderRadius: 5
        },

        title: {
            text: titulo
        },

        subtitle: {
            text: 'All traffic sources combined'
        },

        yAxis: {
            title: {
                text: 'Unique users'
            }
        },

        xAxis: {
            type: 'datetime',
            crosshair: true,

     min: Date.UTC(ano, mes-1, dia),
    max: Date.UTC(ano, mes + 3, dia),

    tickPositions: [
        Date.UTC(ano, mes, dia),
        Date.UTC(ano, mes, dia +1),
        Date.UTC(ano, mes, dia + 2),
        Date.UTC(ano, mes, dia + 3)
    ],

    startOnTick: true,
    endOnTick: true,
    maxPadding: 0.05,

            dateTimeLabelFormats: {

                millisecond: {
                    main: '%H:%M:%S.%L'
                },

                second: {
                    main: '%H:%M:%S'
                },

                minute: {
                    main: '%H:%M'
                },

                hour: {
                    main: '%H:%M'
                },

                day: {
                    main: '%d/%m'
                },

                week: {
                    main: '%d/%m'
                },

                month: {
                    main: '%b %Y'
                },

                year: {
                    main: '%Y'
                }
            },

            lineWidth: 0,
            tickLength: 6,
            tickColor: 'var(--highcharts-neutral-color-10, #e6e6e6)'
        },

        legend: {
            enabled: false
        },

        tooltip: {
            shared: true,
            useHTML: true,

            headerFormat:
                '<table><caption><b>{point.x:%d/%m/%Y}</b></caption>',

            pointFormat:
                '<tr>' +
                '<th>' +
                '<svg width="20" height="10">' +
                '<path d="M5 5 L13 5" stroke="{series.color}" stroke-width="5" stroke-linecap="round"/>' +
                '</svg> {series.name}' +
                '</th>' +
                '<td><b>{point.y}</b></td>' +
                '</tr>',

            footerFormat: '</table>'
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },

        series: [{
            type: 'line',
            name: 'Users',
            color: 'light-dark(#0097FF, #27A6FE)',

            data: [
                // [Date.UTC(2026, 0, 1), 150],
                // [Date.UTC(2026, 1, 1), 180],
                // [Date.UTC(2026, 2, 1), 220],
                // [Date.UTC(2026, 3, 1), 300],
                // [Date.UTC(2026, 4, 1), 270],
                // [Date.UTC(2026, 5, 1), 360],
                // [Date.UTC(2026, 6, 1), 420],
                // [Date.UTC(2026, 7, 1), 390],
                // [Date.UTC(2026, 8, 1), 480],
                // [Date.UTC(2026, 9, 1), 530],
                // [Date.UTC(2026, 10, 1), 510],
                // [Date.UTC(2026, 11, 1), 620]

                // horas

//  [Date.UTC(2026,0,1,10), 20],
//  [Date.UTC(2026,0,1,11), 25],
//  [Date.UTC(2026,0,1,12), 20],
//  [Date.UTC(2026,0,1,13), 30]


// // dias
// [
//  [Date.UTC(2026,0,1), 20],
//  [Date.UTC(2026,0,2), 25]
// ]

// // meses
//  [Date.UTC(2026,0,1), 20],
//  [Date.UTC(2026,1,1), 25]


// // anos

//  [Date.UTC(2026,0,1), 20],
//  [Date.UTC(2027,0,1), 25]
 [Date.UTC(ano,mes,dia), 20],
 [Date.UTC(ano,mes,dia +1), 25],
 [Date.UTC(ano,mes,dia +2), 19],
 [Date.UTC(ano,mes,dia +3), 35]

            ]
        }]
    });

    this.atualizarTemaGraficos();
}


}
