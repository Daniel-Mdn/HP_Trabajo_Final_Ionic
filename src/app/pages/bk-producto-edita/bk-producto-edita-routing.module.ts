import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkProductoEditaPage } from './bk-producto-edita.page';

const routes: Routes = [
  {
    path: '',
    component: BkProductoEditaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkProductoEditaPageRoutingModule {}
