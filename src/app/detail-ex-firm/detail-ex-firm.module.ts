import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailExFirmPageRoutingModule } from './detail-ex-firm-routing.module';

import { DetailExFirmPage } from './detail-ex-firm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailExFirmPageRoutingModule
  ],
  declarations: [DetailExFirmPage]
})
export class DetailExFirmPageModule { }
