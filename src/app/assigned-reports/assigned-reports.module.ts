import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedReportsPageRoutingModule } from './assigned-reports-routing.module';

import { AssignedReportsPage } from './assigned-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedReportsPageRoutingModule
  ],
  declarations: [AssignedReportsPage]
})
export class AssignedReportsPageModule {}
