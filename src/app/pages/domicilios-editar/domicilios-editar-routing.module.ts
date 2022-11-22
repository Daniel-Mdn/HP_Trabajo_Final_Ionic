import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomiciliosEditarPage } from './domicilios-editar.page';

const routes: Routes = [
  {
    path: '',
    component: DomiciliosEditarPage
  },
  {
    path: ':id',
    component: DomiciliosEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomiciliosEditarPageRoutingModule {}
