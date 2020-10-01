import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { LeafletMarkerService } from './_services/leaflet-marker.service';
import { HttpClientModule } from '@angular/common/http';
import { AgmMapComponent } from './agm-map/agm-map.component';
import {AGMMarkerService} from './_services/agm-marker.service';
import { DataParserComponent } from './data-parser/data-parser.component';
import { LayersComponent } from './layers/layers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoSidebarComponent } from './info-sidebar/info-sidebar.component';
import { InfoSidebarDirective } from './_directives/info-sidebar.directive';
import { MarkerInfoComponent } from './marker-info/marker-info.component';
import {SharedMarkerInfoService} from './_services/shared-marker-info.service';
import {InfoSidebarToggleService} from './_services/info-sidebar-toggle.service';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {SearchService} from "./_services/search.service";
import {JsonService} from "./_services/json.service";
import {MarkerService} from "./_services/marker.service";
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FiltersComponent } from './filters/filters.component';
import { ClarityModule } from '@clr/angular';
import { FiltersDirective } from './_directives/filters.directive';
import { OptionComponent } from './autocomplete/option/option.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteContentDirective } from './_directives/autocomplete-content.directive';
import { AutocompleteDirective } from './_directives/autocomplete.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { AgmGeolocationControlComponent } from './agm-geolocation-control/agm-geolocation-control.component';

const appRoutes: Routes = [
  { path: 'info-sidebar', component: InfoSidebarComponent, data: { title: 'Info Sidebar Component' } },
  { path: 'openstreetmaps', component: LeafletMapComponent },
  { path: 'googlemaps', component: AgmMapComponent },
  { path: '', redirectTo: 'openstreetmaps', pathMatch: 'full' }
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
    SearchComponent,
    HomeComponent,
    FiltersComponent,
    FiltersDirective,
    OptionComponent,
    AutocompleteComponent,
    AutocompleteContentDirective,
    AutocompleteDirective,
    AgmGeolocationControlComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA7Mvrt-40TlYzCdkfYIdgLbeBIbd0RKSM'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    ),
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    ClarityModule,
    OverlayModule
  ],
  providers: [
    LeafletMarkerService,
    AGMMarkerService,
    InfoSidebarComponent,
    JsonService,
    MarkerService,
    SharedMarkerInfoService,
    InfoSidebarToggleService,
    SearchService
  ],
  entryComponents: [ MarkerInfoComponent, AutocompleteComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
