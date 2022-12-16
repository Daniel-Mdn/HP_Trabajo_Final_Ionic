import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkAdicionalEditaPage } from './bk-adicional-edita.page';

const routes: Routes = [
  {
    path: ':id',
    component: BkAdicionalEditaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkAdicionalEditaPageRoutingModule {}
