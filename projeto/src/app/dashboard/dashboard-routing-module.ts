import { RouterModule, Routes } from "@angular/router";
import { Dashboard } from "./dashboard";
import { NgModule } from "@angular/core";


const routes :Routes = [
    {
    path:'dashboard',
    component: Dashboard
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class DashboardRoutingModule{}