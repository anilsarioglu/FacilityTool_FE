import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalFirmPage } from './external-firm.page';

const routes: Routes = [
  {
    path: '',
    component: ExternalFirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalFirmPageRoutingModule {}
