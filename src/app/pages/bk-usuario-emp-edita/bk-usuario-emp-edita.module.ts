import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkUsuarioEmpEditaPageRoutingModule } from './bk-usuario-emp-edita-routing.module';

import { BkUsuarioEmpEditaPage } from './bk-usuario-emp-edita.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkUsuarioEmpEditaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BkUsuarioEmpEditaPage]
})
export class BkUsuarioEmpEditaPageModule {}
