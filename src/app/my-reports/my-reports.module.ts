import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReportsPageRoutingModule } from './my-reports-routing.module';

import { MyReportsPage } from './my-reports.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyReportsPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MyReportsPage]
})
export class MyReportsPageModule {}
