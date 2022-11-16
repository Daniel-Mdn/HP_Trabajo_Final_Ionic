import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliosRegistroPageRoutingModule } from './domicilios-registro-routing.module';

import { DomiciliosRegistroPage } from './domicilios-registro.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DomiciliosRegistroPageRoutingModule
  ],
  declarations: [DomiciliosRegistroPage]
})
export class DomiciliosRegistroPageModule {}
