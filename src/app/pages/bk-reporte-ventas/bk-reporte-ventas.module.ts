import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkReporteVentasPageRoutingModule } from './bk-reporte-ventas-routing.module';

import { BkReporteVentasPage } from './bk-reporte-ventas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkReporteVentasPageRoutingModule
  ],
  declarations: [BkReporteVentasPage]
})
export class BkReporteVentasPageModule {}
