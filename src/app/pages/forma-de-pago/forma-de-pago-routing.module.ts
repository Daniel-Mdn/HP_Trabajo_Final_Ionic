import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormaDePagoPage } from './forma-de-pago.page';

const routes: Routes = [
  {
    path: '',
    component: FormaDePagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormaDePagoPageRoutingModule {}
