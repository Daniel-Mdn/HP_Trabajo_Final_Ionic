import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkPedidoEstadoPage } from './bk-pedido-estado.page';

const routes: Routes = [
  {
    path: '',
    component: BkPedidoEstadoPage
  },
  {
    path: ':pedidoId',
    component: BkPedidoEstadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkPedidoEstadoPageRoutingModule {}
