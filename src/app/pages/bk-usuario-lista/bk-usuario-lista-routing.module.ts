import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkUsuarioListaPage } from './bk-usuario-lista.page';

const routes: Routes = [
  {
    path: '',
    component: BkUsuarioListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkUsuarioListaPageRoutingModule {}
