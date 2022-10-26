import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkProductoListaPage } from './bk-producto-lista.page';

const routes: Routes = [
  {
    path: '',
    component: BkProductoListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkProductoListaPageRoutingModule {}
