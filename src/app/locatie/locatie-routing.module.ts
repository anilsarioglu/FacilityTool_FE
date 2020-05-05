import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocatiePage } from './locatie.page';

const routes: Routes = [
  {
    path: '',
    component: LocatiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatiePageRoutingModule {}
