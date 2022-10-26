import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkListadoPedidosTurnoPageRoutingModule } from './bk-listado-pedidos-turno-routing.module';

import { BkListadoPedidosTurnoPage } from './bk-listado-pedidos-turno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkListadoPedidosTurnoPageRoutingModule
  ],
  declarations: [BkListadoPedidosTurnoPage]
})
export class BkListadoPedidosTurnoPageModule {}
