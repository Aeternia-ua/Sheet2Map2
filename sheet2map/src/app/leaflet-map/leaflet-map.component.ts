import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import { Globals } from '../globals';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SearchService} from "../_services/search.service";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {SharedService} from "../_services/shared.service";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map;
  private selectedResult: any;

  constructor(private markerService: MarkerService,
              private sharedService: SharedService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    //Subscribe to search selection to zoom the map to the selected marker
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
      this.findMarker(this.selectedResult);
    })
    }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.createMarkers(this.map);
  }
  private initMap(): void {
    this.map = L.map('map', {
      // Leaflet leaflet-map options
      center: Globals.mapCenter,
      zoom: Globals.mapZoom
    });
    // This is the Carto Positron basemap
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
    this.map.addEventListener('click', () => {
      this.infoSidebarToggleService.close();
    });
  }

  findMarker(feature): void {
    try {
      let latLng = [feature.value.geometry.coordinates[1], feature.value.geometry.coordinates[0]];
      const props = feature.value.properties;
      feature.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
      this.newMarkerInfo(feature.markerInfo);
      return this.map.setView(latLng, 17); // Zoom to selected search result
    } catch (error) {
      console.log('coords undefined');
    }
  }
  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }
}



