import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MailTemplateManagePage } from './mail-template-manage.page';

const routes: Routes = [
  {
    path: '',
    component: MailTemplateManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailTemplateManagePageRoutingModule {}
