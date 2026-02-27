import { NgModule } from "@angular/core";
import { Dashboard } from "./dashboard";
import { DashboardRoutingModule } from "./dashboard-routing-module";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../core/material/material.module";
import { CalendarioModule } from "../calendario/modulo/calendario-module";
import { FiltroModule } from "../filtros/modulo/filtro-module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        Dashboard
    ],
    imports:[
        DashboardRoutingModule,
        SharedModule,
        MaterialModule,
        CalendarioModule,
        FiltroModule,
        CommonModule
    ],
    exports:[
        Dashboard
    ]
})

export class DashboardModule{}