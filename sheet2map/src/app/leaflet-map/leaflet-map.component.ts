import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { LeafletMarkerService } from '../_services/leaflet-marker.service';
import { Globals } from '../globals';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SearchService} from "../_services/search.service";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {SharedService} from "../_services/shared.service";
import {Observable} from "rxjs";
import {share} from "rxjs/operators";
import {MarkerService} from "../_services/marker.service";

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit {
  private map;
  readonly markers: Observable<any[]> = this.markerService.createMarkers().pipe(share());
  private selectedResult: any;

  constructor(
              private leafletMarkerService: LeafletMarkerService,
              private sharedService: SharedService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private searchService: SearchService,
              private markerService: MarkerService) {
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
    this.markers.subscribe(markers => {
      console.log('markers ', markers);
    this.leafletMarkerService.createMarkers(this.map, markers)});
  }
  private initMap(): void {
    this.map = L.map('map', {
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

  findMarker(marker): void {
    try {
      // console.log('leaflet selected marker ', marker);
      let id = marker.value.id;
      // console.log('leaflet selected marker ', marker, id);
      // let latLng = [feature.value.geometry.coordinates[1], feature.value.geometry.coordinates[0]];
      // const props = feature.value.properties;
      // feature.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
      // this.newMarkerInfo(feature.markerInfo);
      // return this.map.setView(latLng, 17); // Zoom to selected search result
    } catch (error) {
      console.log('coords undefined');
    }
  }
  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }
}



