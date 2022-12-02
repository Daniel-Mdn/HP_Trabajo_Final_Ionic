import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkPedidoDetallePage } from './bk-pedido-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: BkPedidoDetallePage
  },
  {
    path: ':pedidoId',
    component: BkPedidoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkPedidoDetallePageRoutingModule {}
