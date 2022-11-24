import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkAdicionalListaPage } from './bk-adicional-lista.page';

const routes: Routes = [
  {
    path: '',
    component: BkAdicionalListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkAdicionalListaPageRoutingModule {}
