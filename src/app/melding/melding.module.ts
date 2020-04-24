import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeldingPageRoutingModule } from './melding-routing.module';

import { MeldingPage } from './melding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MeldingPageRoutingModule
  ],
  declarations: [MeldingPage]
})
export class MeldingPageModule { }
