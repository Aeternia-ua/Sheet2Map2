import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { LeafletMarkerService } from '../_services/leaflet-marker.service';
import { Globals } from '../globals';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SearchService} from '../_services/search.service';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {Observable, of} from 'rxjs';
import {MarkerService} from '../_services/marker.service';
import {Marker} from '../marker.class';
import {FiltersService} from '../_services/filters.service';
import {AgmGeolocationService} from '../_services/agm-geolocation.service';
import {LeafletGeolocationService} from '../_services/leaflet-geolocation.service';
import {LeafletGeolocationControlService} from '../_services/leaflet-geolocation-control.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) lMap: ElementRef;
  @ViewChild('geolocationControl', { static: false }) geolocationControl: ElementRef;
  private map: L.map;
  mapOptions;
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  private selectedResult: any;
  @Input()filteredMarkers: Marker[];

  constructor(
              private leafletMarkerService: LeafletMarkerService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private searchService: SearchService,
              private markerService: MarkerService,
              private filtersService: FiltersService,
              private leafletGeolocationService: LeafletGeolocationService,
              private leafletGeolocationControlService: LeafletGeolocationControlService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markers.subscribe(markers => {
      console.log("leaflet markers length ", markers.length);
      this.leafletMarkerService.createMarkers(this.map, markers);
      this.filtersService.initFilteredMarkers(markers).subscribe(filteredMarkers => {
        this.filteredMarkers = filteredMarkers;
        this.leafletMarkerService.updateMarkers(this.filteredMarkers);
      });
      // Subscribe to search selection to find selected marker on the map
      this.searchService.sharedSelectedResult.subscribe(selectedResult => {
        this.selectedResult = selectedResult;
        this.findMarker(this.selectedResult, this.leafletMarkerService.clusteredMarkers, this.leafletMarkerService.layers);
      });
    });
  }

  private initMap(): void {
    this.map = new L.map(this.lMap.nativeElement);
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
    this.leafletGeolocationControlService.addGeolocationControl(this.map, this.geolocationControl);
    this.map.addEventListener('click', () => {
      this.infoSidebarToggleService.close();
      this.leafletMarkerService.deselect(this.leafletMarkerService.selectedMarker); // If exists, deselect previously selected marker
    });
  }

  findMarker(marker: L.marker, cluster: any, layers: any[]): void {
    try {
      const selectedMarker: Marker = marker.value;
      const foundMarker: L.marker = cluster.find(lmarker => lmarker.markerID === selectedMarker.MarkerID);
      // Select markercluster which is layers[1] of layers to zoom to clustered marker
      // TODO: Uncluster found marker
      layers[1].zoomToShowLayer(foundMarker);
      foundMarker.fire('click');
    } catch (error) {
      console.log('Leaflet search input is undefined');
    }
  }
}



