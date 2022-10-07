import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioCliEditaPage } from './usuario-cli-edita.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioCliEditaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioCliEditaPageRoutingModule {}
