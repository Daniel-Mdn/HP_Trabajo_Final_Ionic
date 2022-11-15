import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkReporteVentasPage } from './bk-reporte-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: BkReporteVentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkReporteVentasPageRoutingModule {}
