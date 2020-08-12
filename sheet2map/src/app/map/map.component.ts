import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import { Globals } from '../globals';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarDirective} from '../directives/info-sidebar.directive';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {
  private map;

  constructor(private markerService: MarkerService) {
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.createMarkers(this.map);

  }
  private initMap(): void {
    this.map = L.map('map', {
      // Leaflet map options
      center: Globals.mapCenter,
      zoom: Globals.mapZoom
    });
    // This is the Carto Positron basemap
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
  }

}



