import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkAdicionalCargaPage } from './bk-adicional-carga.page';

const routes: Routes = [
  {
    path: '',
    component: BkAdicionalCargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkAdicionalCargaPageRoutingModule {}
