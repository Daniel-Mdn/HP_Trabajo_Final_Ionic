import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionDomicilioPageRoutingModule } from './seleccion-domicilio-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { SeleccionDomicilioPage } from './seleccion-domicilio.page';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionDomicilioPageRoutingModule
  ],
  declarations: [SeleccionDomicilioPage]
})
export class SeleccionDomicilioPageModule {}
