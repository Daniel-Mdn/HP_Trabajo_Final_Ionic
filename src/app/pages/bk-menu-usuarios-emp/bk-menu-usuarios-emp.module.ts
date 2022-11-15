import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkMenuUsuariosEmpPageRoutingModule } from './bk-menu-usuarios-emp-routing.module';

import { BkMenuUsuariosEmpPage } from './bk-menu-usuarios-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkMenuUsuariosEmpPageRoutingModule
  ],
  declarations: [BkMenuUsuariosEmpPage]
})
export class BkMenuUsuariosEmpPageModule {}
