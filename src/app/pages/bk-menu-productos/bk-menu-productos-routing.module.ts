import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkMenuProductosPage } from './bk-menu-productos.page';

const routes: Routes = [
  {
    path: '',
    component: BkMenuProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkMenuProductosPageRoutingModule {}
