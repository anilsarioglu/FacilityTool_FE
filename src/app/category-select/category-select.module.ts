import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorySelectPageRoutingModule } from './category-select-routing.module';

import { CategorySelectPage } from './category-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorySelectPageRoutingModule
  ],
  declarations: [CategorySelectPage]
})
export class CategorySelectPageModule {}
