import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaginaNaoEncontrada } from "./pagina-nao-encontrada/pagina-nao-encontrada";

const routes: Routes=[{
    path:'pagina-nao-encontrada',
    component:PaginaNaoEncontrada
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ErroRoutingModule{

}