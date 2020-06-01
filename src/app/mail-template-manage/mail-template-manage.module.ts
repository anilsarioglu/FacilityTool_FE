import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailTemplateManagePageRoutingModule } from './mail-template-manage-routing.module';

import { MailTemplateManagePage } from './mail-template-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MailTemplateManagePageRoutingModule
  ],
  declarations: [MailTemplateManagePage]
})
export class MailTemplateManagePageModule {}
