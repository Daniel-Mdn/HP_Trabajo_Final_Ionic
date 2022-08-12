import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomiciliosPage } from './domicilios.page';

const routes: Routes = [
  {
    path: '',
    component: DomiciliosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomiciliosPageRoutingModule {}
