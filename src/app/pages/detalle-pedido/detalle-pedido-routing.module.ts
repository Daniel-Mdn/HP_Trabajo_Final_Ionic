import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePedidoPage } from './detalle-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePedidoPage
  },
  {
    path: ':pedidoId',
    component: DetallePedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePedidoPageRoutingModule {}
