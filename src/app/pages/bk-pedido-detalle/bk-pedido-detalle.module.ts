import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkPedidoDetallePageRoutingModule } from './bk-pedido-detalle-routing.module';

import { BkPedidoDetallePage } from './bk-pedido-detalle.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkPedidoDetallePageRoutingModule
  ],
  declarations: [BkPedidoDetallePage]
})
export class BkPedidoDetallePageModule {}
