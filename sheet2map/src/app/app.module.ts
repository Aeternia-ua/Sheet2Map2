import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './_services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmMapComponent } from './agm-map/agm-map.component';
import {AGMMarkerService} from './_services/agm-marker.service';
import { DataParserComponent } from './data-parser/data-parser.component';
import { LayersComponent } from './layers/layers.component';
import { InfowindowComponent } from './infowindow/infowindow.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AgmMapComponent,
    MapComponent,
    // SpreadsheetComponent,
    DataParserComponent,
    LayersComponent,
    InfowindowComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgs4IyGaQltb8A3s5SbzBBup0RyCpV1uM'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule
  ],
  providers: [
    MarkerService,
    AGMMarkerService
  ],
  entryComponents: [ InfowindowComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
