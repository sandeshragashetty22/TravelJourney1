import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Import your components (create-entry and view-entry)
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
    path: 'create-entry', // Route for creating an entry
    component: CreateEntryComponent // Map this route to CreateEntryComponent
  },
  {
    path: 'view-entries', // Route for viewing entries
    component: ViewEntriesComponent // Map this route to ViewEntryComponent
  },
  {
    path: '', // Default route (redirect to home)
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**', // Wildcard route for handling unknown routes
    redirectTo: 'home' // Redirect to home if route not found
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
