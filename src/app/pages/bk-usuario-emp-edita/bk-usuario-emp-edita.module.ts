import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkUsuarioEmpEditaPageRoutingModule } from './bk-usuario-emp-edita-routing.module';

import { BkUsuarioEmpEditaPage } from './bk-usuario-emp-edita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkUsuarioEmpEditaPageRoutingModule
  ],
  declarations: [BkUsuarioEmpEditaPage]
})
export class BkUsuarioEmpEditaPageModule {}
