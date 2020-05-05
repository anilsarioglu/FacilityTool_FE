import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  //{ path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'melding', loadChildren: () => import('./melding/melding.module').then(m => m.MeldingPageModule) },
  { path: 'locatie', loadChildren: () => import('./locatie/locatie.module').then(m => m.LocatiePageModule) },
  { path: 'melding/:locatie', loadChildren: () => import('./melding/melding.module').then(m => m.MeldingPageModule) },
  { path: 'tab1', loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) },
  { path: 'tab1/:melding', loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) },
  { path: 'detail-melding', loadChildren: () => import('./detail-melding/detail-melding.module').then(m => m.DetailMeldingPageModule) },
  { path: 'locatie-melding', loadChildren: () => import('./locatieMelding/locatie-melding.module').then(m => m.LocatieMeldingPageModule) },
  { path: 'locatie-melding/:locatie', loadChildren: () => import('./locatieMelding/locatie-melding.module').then(m => m.LocatieMeldingPageModule) },
  { path: 'image-modal', loadChildren: () => import('./image-modal/image-modal.module').then(m => m.ImageModalPageModule) }
  //{ path: 'app', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  {
    path: 'category-select',
    loadChildren: () => import('./category-select/category-select.module').then( m => m.CategorySelectPageModule)
  },
  {
    path: 'category-manage',
    loadChildren: () => import('./category-manage/category-manage.module').then( m => m.CategoryManagePageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
