import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioCliRegistroPage } from './usuario-cli-registro.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioCliRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioCliRegistroPageRoutingModule {}
