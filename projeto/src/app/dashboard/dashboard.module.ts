import { NgModule } from "@angular/core";
import { Dashboard } from "./dashboard";
import { DashboardRoutingModule } from "./dashboard-routing-module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations:[
        Dashboard
    ],
    imports:[
        DashboardRoutingModule,
        SharedModule
    ],
    exports:[
        Dashboard
    ]
})

export class DashboardModule{}