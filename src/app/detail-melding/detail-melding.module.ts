import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMeldingPageRoutingModule } from './detail-melding-routing.module';

import { DetailMeldingPage } from './detail-melding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMeldingPageRoutingModule
  ],
  declarations: [DetailMeldingPage]
})
export class DetailMeldingPageModule {}
