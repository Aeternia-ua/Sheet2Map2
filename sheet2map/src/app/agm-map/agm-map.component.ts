import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Globals } from '../globals';
import { AGMMarkerService } from '../_services/agm-marker.service';
import {MapsAPILoader} from '@agm/core';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {SearchService} from '../_services/search.service';
import {MarkerService} from '../_services/marker.service';
import {Observable} from 'rxjs';
import {Marker} from '../marker.class';
import {FiltersService} from '../_services/filters.service';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {AgmGeolocationService} from '../_services/agm-geolocation.service';
import {AgmGeolocationControlComponent} from '../agm-geolocation-control/agm-geolocation-control.component';
import {AgmGeolocationControlService} from '../_services/agm-geolocation-control.service';

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
  readonly markers: Observable<Marker[]> = this.markerService.getMarkers();
  @Input()filteredMarkers: Marker[];
  // private controlUI: any;

  constructor(public mapsApiLoader: MapsAPILoader,
              private markerService: MarkerService,
              private agmMarkerService: AGMMarkerService,
              private searchService: SearchService,
              private infoSidebarToggleService: InfoSidebarToggleService,
              private filtersService: FiltersService,
              private agmGeolocationControlService: AgmGeolocationControlService) {
    this.mapsApiLoader = mapsApiLoader;
  }

  ngOnInit(): void {
    // Subscribe to selected search result to find marker on the map
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
      this.findMarker(this.selectedResult, this.agmMarkerService.clusteredMarkers);
    });
  }

  ngAfterViewInit(): void {
    this.mapsApiLoader.load().then(() => {
       this.initMap();
       this.markers.subscribe(markers => { // Subscribe to shared markers data
         this.agmMarkerService.createMarkers(this.map, markers);
         this.filtersService.initFilteredMarkers(markers).subscribe(filteredMarkers => {
           this.filteredMarkers = filteredMarkers;
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
      fullscreenControl: true,
      mapTypeControl: true, // Switch between satellite and terrain map types
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER,
      },
    };
    this.map = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
    this.agmGeolocationControlService.addGeolocationControl(this.map); // Add user geolocation button

    this.map.addListener('click', () => {
      this.infoSidebarToggleService.close(); // Close info sidebar when map is clicked
      this.deselect(this.agmMarkerService.selectedMarker); // If exists, deselect previously selected marker
    });
  }

  private deselect(marker): google.maps.Marker {
    if (marker) { return marker.setAnimation(null); }
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
}
