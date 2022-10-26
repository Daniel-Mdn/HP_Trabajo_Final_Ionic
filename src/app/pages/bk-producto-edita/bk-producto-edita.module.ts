import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkProductoEditaPageRoutingModule } from './bk-producto-edita-routing.module';

import { BkProductoEditaPage } from './bk-producto-edita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkProductoEditaPageRoutingModule
  ],
  declarations: [BkProductoEditaPage]
})
export class BkProductoEditaPageModule {}
