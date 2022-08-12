import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliosPageRoutingModule } from './domicilios-routing.module';

import { DomiciliosPage } from './domicilios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomiciliosPageRoutingModule
  ],
  declarations: [DomiciliosPage]
})
export class DomiciliosPageModule {}
