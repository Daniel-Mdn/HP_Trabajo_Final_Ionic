import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkMenuEmpleadoPageRoutingModule } from './bk-menu-empleado-routing.module';

import { BkMenuEmpleadoPage } from './bk-menu-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkMenuEmpleadoPageRoutingModule
  ],
  declarations: [BkMenuEmpleadoPage]
})
export class BkMenuEmpleadoPageModule {}
