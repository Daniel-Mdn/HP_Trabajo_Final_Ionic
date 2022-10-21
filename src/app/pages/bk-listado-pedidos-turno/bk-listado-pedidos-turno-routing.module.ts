import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkListadoPedidosTurnoPage } from './bk-listado-pedidos-turno.page';

const routes: Routes = [
  {
    path: '',
    component: BkListadoPedidosTurnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkListadoPedidosTurnoPageRoutingModule {}
