import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionDomicilioPage } from './seleccion-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionDomicilioPageRoutingModule {}
