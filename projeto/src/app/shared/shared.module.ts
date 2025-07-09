import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { Calendario } from "./calendario/calendario";
import { DataIntervalo } from "./data-intervalo/data-intervalo";
import { Grafico } from "./grafico/grafico";
import { InputData } from "./input-data/input-data";
import { InputMesAnoIntervalo } from "./input-mes-ano-intervalo/input-mes-ano-intervalo";
import { InputMes } from "./input-mes-ano/input-mes";
import { LabelData } from "./label-data/label-data";
import { SeletorAnoIntervalo } from "./seletor-ano-intervalo/seletor-ano-intervalo";
import { SeletorAno } from "./seletor-ano/seletor-ano";
import { MaterialModule } from "../core/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Tabela } from './tabela/tabela';
import { Dialog } from './dialog/dialog';
import { DialogAdicionarItem } from './dialog-adicionar-item/dialog-adicionar-item';

@NgModule({
    declarations: [
        Calendario,
        Grafico,
        InputMesAnoIntervalo,
        SeletorAnoIntervalo,
        DataIntervalo,
        InputMes,
        InputData,
        SeletorAno,
        LabelData,
        Tabela,
        Dialog,
        DialogAdicionarItem
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        Calendario,
        Grafico,
        InputMesAnoIntervalo,
        SeletorAnoIntervalo,
        DataIntervalo,
        InputMes,
        InputData,
        SeletorAno,
        LabelData,
        Tabela,
        Dialog,
        DialogAdicionarItem
    ],
     providers: [
    DatePipe, { provide: LOCALE_ID, useValue: 'pt' } 
  ],
})

export class SharedModule { }