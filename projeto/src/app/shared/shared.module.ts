import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { Grafico } from "./grafico/grafico";
import { MaterialModule } from "../core/material/material.module";
import { Tabela } from './tabela/tabela';
import { Dialog } from './tabela/dialog/dialog';
import { DialogAdicionarItem } from './tabela/dialog-adicionar-item/dialog-adicionar-item';
import { NavBar } from './nav-bar/nav-bar';
import { SideBar } from './side-bar/side-bar';
import { DialogConfirmeDelete } from './tabela/dialog-confirme-delete/dialog-confirme-delete';
import { Footer } from './footer/footer';
import { TranslocoModule } from "@jsverse/transloco";
import { CalendarioModule } from "../calendario/modulo/calendario-module";


@NgModule({
    declarations: [
        Grafico,
        Tabela,
        Dialog,
        DialogAdicionarItem,
        NavBar,
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
        TranslocoModule,
        CalendarioModule
    ],
    exports: [
        Grafico,
        Tabela,
        Dialog,
        DialogAdicionarItem,
        NavBar,
        SideBar,
        DialogConfirmeDelete,
        Footer
    ]
})

export class SharedModule { }