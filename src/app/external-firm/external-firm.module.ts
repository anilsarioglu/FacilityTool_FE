import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExternalFirmPageRoutingModule } from './external-firm-routing.module';

import { ExternalFirmPage } from './external-firm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExternalFirmPageRoutingModule
  ],
  declarations: [ExternalFirmPage]
})
export class ExternalFirmPageModule { }
