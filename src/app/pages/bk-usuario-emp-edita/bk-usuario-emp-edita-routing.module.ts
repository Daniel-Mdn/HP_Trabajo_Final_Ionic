import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkUsuarioEmpEditaPage } from './bk-usuario-emp-edita.page';

const routes: Routes = [
  {
    path: '',
    component: BkUsuarioEmpEditaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkUsuarioEmpEditaPageRoutingModule {}
