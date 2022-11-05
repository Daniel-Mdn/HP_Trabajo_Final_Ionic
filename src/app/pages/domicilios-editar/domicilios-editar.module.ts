import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomiciliosEditarPageRoutingModule } from './domicilios-editar-routing.module';

import { DomiciliosEditarPage } from './domicilios-editar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DomiciliosEditarPageRoutingModule
  ],
  declarations: [DomiciliosEditarPage]
})
export class DomiciliosEditarPageModule {}
