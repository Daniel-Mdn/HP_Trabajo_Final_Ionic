import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliosRegistroPageRoutingModule } from './domicilios-registro-routing.module';

import { DomiciliosRegistroPage } from './domicilios-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomiciliosRegistroPageRoutingModule
  ],
  declarations: [DomiciliosRegistroPage]
})
export class DomiciliosRegistroPageModule {}
