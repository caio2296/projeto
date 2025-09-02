import { NgModule } from "@angular/core";
import { Dashboard } from "./dashboard";
import { DashboardRoutingModule } from "./dashboard-routing-module";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../core/material/material.module";

@NgModule({
    declarations:[
        Dashboard
    ],
    imports:[
        DashboardRoutingModule,
        SharedModule,
        MaterialModule
    ],
    exports:[
        Dashboard
    ]
})

export class DashboardModule{}