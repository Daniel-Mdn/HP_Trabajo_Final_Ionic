import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BkUsuarioEmpRegistroPage } from './bk-usuario-emp-registro.page';

const routes: Routes = [
  {
    path: '',
    component: BkUsuarioEmpRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BkUsuarioEmpRegistroPageRoutingModule {}
