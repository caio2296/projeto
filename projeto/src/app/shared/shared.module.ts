import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DataIntervalo } from "./nav-bar/calendario-dialog/componentes/data-intervalo/data-intervalo";
import { Grafico } from "./grafico/grafico";
import { InputData } from "./nav-bar/calendario-dialog/componentes/input-data/input-data";
import { InputMesAnoIntervalo } from "./nav-bar/calendario-dialog/componentes/input-mes-ano-intervalo/input-mes-ano-intervalo";
import { InputMes } from "./nav-bar/calendario-dialog/componentes/input-mes-ano/input-mes";
import { LabelData } from "./label-data/label-data";
import { SeletorAno } from "./nav-bar/calendario-dialog/componentes/seletor-ano/seletor-ano";
import { SeletorAnoIntervalo } from "./nav-bar/calendario-dialog/componentes/seletor-ano-intervalo/seletor-ano-intervalo";
import { MaterialModule } from "../core/material/material.module";
import { Tabela } from './tabela/tabela';
import { Dialog } from './tabela/dialog/dialog';
import { DialogAdicionarItem } from './tabela/dialog-adicionar-item/dialog-adicionar-item';
import { CalendarioDialog } from './nav-bar/calendario-dialog/calendario-dialog';
import { NavBar } from './nav-bar/nav-bar';
import { SeletorAnoFiscalIntervalo } from './nav-bar/calendario-dialog/componentes/seletor-ano-fiscal-intervalo/seletor-ano-fiscal-intervalo';
import { RouterModule } from "@angular/router";
import { SideBar } from './side-bar/side-bar';
import { DialogConfirmeDelete } from './tabela/dialog-confirme-delete/dialog-confirme-delete';
import { Footer } from './footer/footer';
import { TranslocoModule } from "@jsverse/transloco";
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
    declarations: [
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
        DialogAdicionarItem,
        CalendarioDialog,
        NavBar,
        SeletorAnoFiscalIntervalo,
        SideBar,
        DialogConfirmeDelete,
        Footer
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        TranslocoModule
    ],
    exports: [
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
        DialogAdicionarItem,
        NavBar,
        SeletorAnoFiscalIntervalo,
        SideBar,
        DialogConfirmeDelete,
        Footer
    ],
     providers: [
     { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
})

export class SharedModule { }