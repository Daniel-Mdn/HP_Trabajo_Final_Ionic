import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarPedidoPageRoutingModule } from './confirmar-pedido-routing.module';

import { ConfirmarPedidoPage } from './confirmar-pedido.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarPedidoPageRoutingModule
  ],
  declarations: [ConfirmarPedidoPage]
})
export class ConfirmarPedidoPageModule {}
