import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkUsuarioEmpRegistroPageRoutingModule } from './bk-usuario-emp-registro-routing.module';

import { BkUsuarioEmpRegistroPage } from './bk-usuario-emp-registro.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkUsuarioEmpRegistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BkUsuarioEmpRegistroPage]
})
export class BkUsuarioEmpRegistroPageModule {}
