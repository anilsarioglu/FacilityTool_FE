import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeldingPageRoutingModule } from './melding-routing.module';

import { MeldingPage } from './melding.page';


import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MeldingPageRoutingModule
  ],
  declarations: [MeldingPage, FileSelectDirective,
    FileDropDirective]
})
export class MeldingPageModule { }
