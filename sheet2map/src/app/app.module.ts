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
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoSidebarComponent } from './info-sidebar/info-sidebar.component';
import { InfoSidebarDirective } from './_directives/info-sidebar.directive';
import { MarkerInfoComponent } from './marker-info/marker-info.component';
import {SharedMarkerInfoService} from './_services/shared-marker-info.service';
import {InfoSidebarToggleService} from './_services/info-sidebar-toggle.service';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {SearchService} from "./_services/search.service";
import {JsonService} from "./_services/json.service";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
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
    SearchComponent,
    HomeComponent,
    FiltersComponent,
    FiltersDirective,
    OptionComponent,
    AutocompleteComponent,
    AutocompleteContentDirective,
    AutocompleteDirective,
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
    MatOptionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    LayoutModule,
    ClarityModule
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
  exports: [ MatFormFieldModule, MatInputModule ],
  entryComponents: [ MarkerInfoComponent, AutocompleteComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
