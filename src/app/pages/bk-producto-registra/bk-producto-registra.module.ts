import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BkProductoRegistraPageRoutingModule } from './bk-producto-registra-routing.module';

import { BkProductoRegistraPage } from './bk-producto-registra.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BkProductoRegistraPageRoutingModule,
    ReactiveFormsModule,
    // AngularFireStorageModule
  ],
  declarations: [BkProductoRegistraPage]
})
export class BkProductoRegistraPageModule {}
