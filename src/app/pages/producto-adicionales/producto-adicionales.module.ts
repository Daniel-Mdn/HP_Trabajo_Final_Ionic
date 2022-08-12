import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoAdicionalesPageRoutingModule } from './producto-adicionales-routing.module';

import { ProductoAdicionalesPage } from './producto-adicionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoAdicionalesPageRoutingModule
  ],
  declarations: [ProductoAdicionalesPage]
})
export class ProductoAdicionalesPageModule {}
