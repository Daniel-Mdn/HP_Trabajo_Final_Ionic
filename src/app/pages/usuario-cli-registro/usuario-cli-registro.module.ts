import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioCliRegistroPageRoutingModule } from './usuario-cli-registro-routing.module';

import { UsuarioCliRegistroPage } from './usuario-cli-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioCliRegistroPageRoutingModule
  ],
  declarations: [UsuarioCliRegistroPage]
})
export class UsuarioCliRegistroPageModule {}
