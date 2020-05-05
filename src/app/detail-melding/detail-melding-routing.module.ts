import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMeldingPage } from './detail-melding.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMeldingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMeldingPageRoutingModule { }
