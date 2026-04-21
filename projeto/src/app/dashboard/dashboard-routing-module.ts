import { RouterModule, Routes } from "@angular/router";
import { Dashboard } from "./dashboard";
import { NgModule } from "@angular/core";
import { DashboardResolver } from "./Resolver/Dashboard.resolver";


const routes :Routes = [
    {
    path: 'dashboard/:id',
    component: Dashboard,
     resolve: {
        dashboard: DashboardResolver
     }
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class DashboardRoutingModule{}