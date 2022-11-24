import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkProductoListaPageRoutingModule } from './bk-producto-lista-routing.module';

import { BkProductoListaPage } from './bk-producto-lista.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkProductoListaPageRoutingModule
  ],
  declarations: [BkProductoListaPage]
})
export class BkProductoListaPageModule {}
