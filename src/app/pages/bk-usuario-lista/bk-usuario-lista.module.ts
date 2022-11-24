import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkUsuarioListaPageRoutingModule } from './bk-usuario-lista-routing.module';

import { BkUsuarioListaPage } from './bk-usuario-lista.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkUsuarioListaPageRoutingModule
  ],
  declarations: [BkUsuarioListaPage]
})
export class BkUsuarioListaPageModule {}
