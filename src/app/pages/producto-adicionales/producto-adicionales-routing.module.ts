import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoAdicionalesPage } from './producto-adicionales.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoAdicionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoAdicionalesPageRoutingModule {}
