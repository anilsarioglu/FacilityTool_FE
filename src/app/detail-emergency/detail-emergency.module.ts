import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailEmergencyPageRoutingModule } from './detail-emergency-routing.module';

import { DetailEmergencyPage } from './detail-emergency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailEmergencyPageRoutingModule
  ],
  declarations: [DetailEmergencyPage]
})
export class DetailEmergencyPageModule { }
