import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})

export class LeafletMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) lMap: ElementRef;
  private map;
  mapOptions;
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  private selectedResult: any;
  private filteredMarkers: any[] = [];

  constructor(
              private leafletMarkerService: LeafletMarkerService,
              private sharedService: SharedMarkerInfoService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private searchService: SearchService,
              private markerService: MarkerService,
              private filtersService: FiltersService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initMap();
    console.log(of(this.markerService.fetchMarkers()));
    this.markers.subscribe(markers => {
      this.leafletMarkerService.createMarkers(this.map, markers);

      // Subscribe to filter selection to filter markers on map
      this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
        this.filteredMarkers = this.filtersService.getFilteredMarkers(selectedFilters, markers);
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
    this.mapOptions = {
      center: Globals.mapCenter,
      zoom: Globals.mapZoom
    };
    this.map = new L.map(this.lMap.nativeElement, this.mapOptions);
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);

    this.map.addEventListener('click', () => {
      this.infoSidebarToggleService.close();
      this.deselect(this.leafletMarkerService.selectedMarker); // If exists, deselect previously selected marker
    });
  }

  findMarker(marker, cluster, layers): void {
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
  private deselect(marker): L.marker {
    if (marker) { return this.leafletMarkerService.setIcon(marker, this.leafletMarkerService.defaultColor); }
  }
}



