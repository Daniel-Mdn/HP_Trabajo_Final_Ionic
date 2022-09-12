import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosHistoricoPage } from './pedidos-historico.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosHistoricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosHistoricoPageRoutingModule {}
