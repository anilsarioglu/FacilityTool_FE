import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivePageRoutingModule } from './archive-routing.module';

import { ArchivePage } from './archive.page';

import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivePageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ArchivePage]
})
export class ArchivePageModule {}
