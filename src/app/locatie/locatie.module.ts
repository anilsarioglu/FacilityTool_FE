import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocatiePageRoutingModule } from './locatie-routing.module';

import { LocatiePage } from './locatie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocatiePageRoutingModule
  ],
  declarations: [LocatiePage]
})
export class LocatiePageModule {}
