import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkPedidoEstadoPageRoutingModule } from './bk-pedido-estado-routing.module';

import { BkPedidoEstadoPage } from './bk-pedido-estado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkPedidoEstadoPageRoutingModule
  ],
  declarations: [BkPedidoEstadoPage]
})
export class BkPedidoEstadoPageModule {}
