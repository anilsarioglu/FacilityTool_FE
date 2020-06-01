import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailEmergencyPage } from './detail-emergency.page';

const routes: Routes = [
  {
    path: '',
    component: DetailEmergencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailEmergencyPageRoutingModule {}
