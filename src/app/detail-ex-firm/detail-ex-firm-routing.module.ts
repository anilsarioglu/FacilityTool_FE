import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailExFirmPage } from './detail-ex-firm.page';

const routes: Routes = [
  {
    path: '',
    component: DetailExFirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailExFirmPageRoutingModule {}
