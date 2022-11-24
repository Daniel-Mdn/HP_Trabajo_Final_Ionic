import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkAdicionalEditaPageRoutingModule } from './bk-adicional-edita-routing.module';

import { BkAdicionalEditaPage } from './bk-adicional-edita.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkAdicionalEditaPageRoutingModule
  ],
  declarations: [BkAdicionalEditaPage]
})
export class BkAdicionalEditaPageModule {}
