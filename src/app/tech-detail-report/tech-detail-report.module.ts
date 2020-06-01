import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechDetailReportPageRoutingModule } from './tech-detail-report-routing.module';

import { TechDetailReportPage } from './tech-detail-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechDetailReportPageRoutingModule
  ],
  declarations: [TechDetailReportPage]
})
export class TechDetailReportPageModule {}
