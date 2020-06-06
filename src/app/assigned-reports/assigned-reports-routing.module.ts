import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedReportsPage } from './assigned-reports.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedReportsPageRoutingModule {}
