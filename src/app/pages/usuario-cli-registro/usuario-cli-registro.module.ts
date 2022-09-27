import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioCliRegistroPageRoutingModule } from './usuario-cli-registro-routing.module';

import { UsuarioCliRegistroPage } from './usuario-cli-registro.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioCliRegistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsuarioCliRegistroPage]
})
export class UsuarioCliRegistroPageModule {}
