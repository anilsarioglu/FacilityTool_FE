import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// azure
import { MsalGuard } from '@azure/msal-angular';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'melding', loadChildren: () => import('./melding/melding.module').then(m => m.MeldingPageModule) },
  { path: 'locatie', loadChildren: () => import('./locatie/locatie.module').then(m => m.LocatiePageModule) },
  { path: 'melding/:locatie', loadChildren: () => import('./melding/melding.module').then(m => m.MeldingPageModule) },
  { path: 'tab1', loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) },
  { path: 'tab3', loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule) },
  { path: 'tab1/:melding', loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) },
  { path: 'detail-melding', loadChildren: () => import('./detail-melding/detail-melding.module').then(m => m.DetailMeldingPageModule) },
  { path: 'locatie-melding', loadChildren: () => import('./locatieMelding/locatie-melding.module').then(m => m.LocatieMeldingPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'locatie-melding/:locatie', loadChildren: () => import('./locatieMelding/locatie-melding.module').then(m => m.LocatieMeldingPageModule) },
  { path: 'image-modal', loadChildren: () => import('./image-modal/image-modal.module').then(m => m.ImageModalPageModule) },
  { path: 'category-select', loadChildren: () => import('./category-select/category-select.module').then(m => m.CategorySelectPageModule) },
  { path: 'category-manage', loadChildren: () => import('./category-manage/category-manage.module').then(m => m.CategoryManagePageModule) },
  { path: 'tech-detail-report', loadChildren: () => import('./tech-detail-report/tech-detail-report.module').then(m => m.TechDetailReportPageModule) },
  { path: 'emergency', loadChildren: () => import('./emergency/emergency.module').then(m => m.EmergencyPageModule) },
  { path: 'detail-emergency', loadChildren: () => import('./detail-emergency/detail-emergency.module').then(m => m.DetailEmergencyPageModule) },
  { path: 'external-firm', loadChildren: () => import('./external-firm/external-firm.module').then(m => m.ExternalFirmPageModule) },
  { path: 'detail-ex-firm', loadChildren: () => import('./detail-ex-firm/detail-ex-firm.module').then(m => m.DetailExFirmPageModule) }


  //azure
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
