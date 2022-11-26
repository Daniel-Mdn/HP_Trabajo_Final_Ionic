import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkAdicionalListaPageRoutingModule } from './bk-adicional-lista-routing.module';

import { BkAdicionalListaPage } from './bk-adicional-lista.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkAdicionalListaPageRoutingModule
  ],
  declarations: [BkAdicionalListaPage]
})
export class BkAdicionalListaPageModule {}
