import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocatieMeldingPage } from './locatie-melding.page';

const routes: Routes = [
  {
    path: '',
    component: LocatieMeldingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatieMeldingPageRoutingModule {}
