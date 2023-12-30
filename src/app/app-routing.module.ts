import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { ViewEntriesComponent } from './view-entries/view-entries.component';

import { FormsModule } from '@angular/forms';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'create-entry', 
    component: CreateEntryComponent 
  },
  {
    path: 'view-entries', 
    component: ViewEntriesComponent 
  },
  {
    path: '', // Default route (redirect to home)
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    IonicModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
