import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MarkerService } from './_services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmMapComponent } from './agm-map/agm-map.component';
import {AGMMarkerService} from './_services/agm-marker.service';
import { DataParserComponent } from './data-parser/data-parser.component';
import { LayersComponent } from './layers/layers.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoSidebarComponent } from './info-sidebar/info-sidebar.component';
import { InfoSidebarDirective } from './_directives/info-sidebar.directive';
import { MarkerInfoComponent } from './marker-info/marker-info.component';
import {SharedService} from './_services/shared.service';
import {InfoSidebarToggleService} from './_services/info-sidebar-toggle.service';
import {RouterModule, Routes} from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SearchPipe } from './_pipes/search.pipe';
import {FormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {SearchService} from "./_services/search.service";
import {JsonService} from "./_services/json.service";

const appRoutes: Routes = [
  { path: 'info-sidebar', component: InfoSidebarComponent, data: { title: 'Info Sidebar Component' } },
  { path: 'leaflet-map', component: LeafletMapComponent },
  { path: 'agm-map', component: AgmMapComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    AgmMapComponent,
    LeafletMapComponent,
    DataParserComponent,
    LayersComponent,
    InfoSidebarComponent,
    InfoSidebarDirective,
    MarkerInfoComponent,
    LayoutComponent,
    SearchPipe,
    SearchComponent,
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
    MatSidenavModule,
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    ),
    MatButtonToggleModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    MarkerService,
    AGMMarkerService,
    InfoSidebarComponent,
    JsonService,
    SharedService,
    InfoSidebarToggleService,
    SearchService
  ],
  entryComponents: [ MarkerInfoComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
