import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkAdicionalCargaPageRoutingModule } from './bk-adicional-carga-routing.module';

import { BkAdicionalCargaPage } from './bk-adicional-carga.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkAdicionalCargaPageRoutingModule
  ],
  declarations: [BkAdicionalCargaPage]
})
export class BkAdicionalCargaPageModule {}
