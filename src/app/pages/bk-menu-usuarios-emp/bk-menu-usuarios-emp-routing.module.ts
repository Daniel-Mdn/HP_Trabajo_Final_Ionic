import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkMenuUsuariosEmpPage } from './bk-menu-usuarios-emp.page';

const routes: Routes = [
  {
    path: '',
    component: BkMenuUsuariosEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkMenuUsuariosEmpPageRoutingModule {}
