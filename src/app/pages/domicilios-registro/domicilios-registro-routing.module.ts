import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomiciliosRegistroPage } from './domicilios-registro.page';

const routes: Routes = [
  {
    path: '',
    component: DomiciliosRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomiciliosRegistroPageRoutingModule {}
