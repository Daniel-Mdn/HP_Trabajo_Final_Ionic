import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkMenuEmpleadoPage } from './bk-menu-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: BkMenuEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkMenuEmpleadoPageRoutingModule {}
