import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Globals } from '../globals';
import { AGMMarkerService } from '../_services/agm-marker.service';
import {MapsAPILoader} from '@agm/core';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {SearchService} from '../_services/search.service';
import {MarkerService} from '../_services/marker.service';
import {Observable, Subject, timer} from 'rxjs';
import {Marker} from '../marker.class';
import {FiltersService} from '../_services/filters.service';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gMap: ElementRef;
  map: google.maps.Map;
  title = 'Sheet2Map Google map';
  lat = Globals.mapCenter[0];
  lng = Globals.mapCenter[1];
  coordinates: google.maps.LatLng; // Coordinates to set initial center of the map
  mapOptions: google.maps.MapOptions;
  private selectedResult: any;
  readonly markers: Observable<any[]> = this.markerService.getMarkers();
  private filteredMarkers: any[];

  constructor(public mapsApiLoader: MapsAPILoader,
              private markerService: MarkerService,
              private agmMarkerService: AGMMarkerService,
              private sharedService: SharedMarkerInfoService,
              private searchService: SearchService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private filtersService: FiltersService) {
    this.mapsApiLoader = mapsApiLoader;
  }

  ngOnInit(): void {
    // Subscribe to search selection to find marker on map
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
      this.findMarker(this.selectedResult, this.agmMarkerService.clusteredMarkers);
    });
    // // Subscribe to filter selection to filter markers on map
    // this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
    //   this.selectedFilters = selectedFilters;
    //   this.agmMarkerService.filterMarkers(this.selectedFilters, this.agmMarkerService.clusteredMarkers);
    // });

  }

  ngAfterViewInit(): void {
    this.mapsApiLoader.load().then(() => {
       this.initMap();
       this.markers.subscribe(markers => { // Subscribe to shared markers data
         this.agmMarkerService.createMarkers(this.map, markers);
         // To get a reference to the markerLayer mapPane
         const overlay = new google.maps.OverlayView();
         overlay.draw = function() {
            // Assign an id to the markerlayer Pane, so it can be referenced by CSS
           // TODO: Create custom animation for selected marker
           // https://stackoverflow.com/questions/27205659/google-map-with-custom-marker-css-animation
          this.getPanes().markerLayer.id = 'markerLayer';
          };
         overlay.setMap(this.map);

         // Subscribe to filter selection to filter markers on map
         this.filtersService.selectedFiltersChange.subscribe(selectedFilters => {
          this.filteredMarkers = this.filtersService.getFilteredMarkers(selectedFilters, markers);
          this.agmMarkerService.updateMarkers(this.filteredMarkers);
         });
       });
    });
  }

  private initMap(): void {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions = { // Google Map options
      center: this.coordinates,
      zoom: Globals.mapZoom,
      fullscreenControl: false,
    };
    this.map = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
    this.map.addListener('click', () => {
      this.infoSidebarToggleService.close(); // Close info sidebar when map is clicked
      this.deselect(this.agmMarkerService.selectedMarker); // If exists, deselect previously selected marker
    });
  }

  private findMarker(marker, cluster): void {
    try {
      const selectedMarker: Marker = marker.value;
      const foundMarker = cluster.find(gmarker => gmarker.markerID === selectedMarker.MarkerID);
      this.map.panTo(foundMarker.position);
      this.map.setZoom(13);
      new google.maps.event.trigger( foundMarker, 'click' );
    } catch (error) {
      console.log('Google map search input is undefined');
    }
  }
  private deselect(marker): google.maps.Marker {
    if (marker) { return marker.setAnimation(null); }
  }
}
