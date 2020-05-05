import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocatieMeldingPageRoutingModule } from './locatie-melding-routing.module';

import { LocatieMeldingPage } from './locatie-melding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocatieMeldingPageRoutingModule
  ],
  declarations: [LocatieMeldingPage]
})
export class LocatieMeldingPageModule {}
