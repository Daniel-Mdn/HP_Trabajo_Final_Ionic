import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkProductoRegistraPage } from './bk-producto-registra.page';

const routes: Routes = [
  {
    path: '',
    component: BkProductoRegistraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkProductoRegistraPageRoutingModule {}
