import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosHistoricoPageRoutingModule } from './pedidos-historico-routing.module';

import { PedidosHistoricoPage } from './pedidos-historico.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosHistoricoPageRoutingModule
  ],
  declarations: [PedidosHistoricoPage]
})
export class PedidosHistoricoPageModule {}
