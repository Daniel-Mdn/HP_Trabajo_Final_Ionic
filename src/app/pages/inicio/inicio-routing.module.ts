import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DomicilioGuard } from 'src/app/guards/domicilio/domicilio.guard';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    canActivate:[DomicilioGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
