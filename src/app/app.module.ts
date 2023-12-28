import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { ViewEntriesComponent } from './view-entries/view-entries.component';
import { AgmCoreModule } from '@grupo-san-cristobal/agm-core';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent, CreateEntryComponent, ViewEntriesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV0c8OzT2Ab45a_2yuA7AibPquTkZCeAE',
      libraries: ['places'],
    }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Geolocation, Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
