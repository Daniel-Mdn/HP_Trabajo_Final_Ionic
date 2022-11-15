import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkProductoEditaPageRoutingModule } from './bk-producto-edita-routing.module';

import { BkProductoEditaPage } from './bk-producto-edita.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkProductoEditaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BkProductoEditaPage]
})
export class BkProductoEditaPageModule {}
