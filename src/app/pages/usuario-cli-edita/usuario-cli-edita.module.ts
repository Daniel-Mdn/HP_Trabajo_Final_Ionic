import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioCliEditaPageRoutingModule } from './usuario-cli-edita-routing.module';

import { UsuarioCliEditaPage } from './usuario-cli-edita.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioCliEditaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioCliEditaPage]
})
export class UsuarioCliEditaPageModule {}
