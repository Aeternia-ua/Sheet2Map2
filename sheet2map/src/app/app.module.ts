import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './_services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmMapComponent } from './agm-map/agm-map.component';
import {AGMMarkerService} from './_services/agm-marker.service';
// import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
// import {DataParserService} from './_services/data-parser.service';
import { DataParserComponent } from './data-parser/data-parser.component';
import {RouterModule} from '@angular/router';
import { LayersComponent } from './layers/layers.component';
import { InfowindowComponent } from './infowindow/infowindow.component';

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
    HttpClientModule
  ],
  providers: [
    MarkerService,
    AGMMarkerService
    // DataParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
