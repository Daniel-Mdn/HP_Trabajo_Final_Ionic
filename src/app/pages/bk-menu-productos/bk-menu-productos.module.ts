import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkMenuProductosPageRoutingModule } from './bk-menu-productos-routing.module';

import { BkMenuProductosPage } from './bk-menu-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BkMenuProductosPageRoutingModule
  ],
  declarations: [BkMenuProductosPage]
})
export class BkMenuProductosPageModule {}
