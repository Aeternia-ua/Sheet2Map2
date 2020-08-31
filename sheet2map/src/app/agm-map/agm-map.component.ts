import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Globals } from '../globals';
import { AGMMarkerService } from '../_services/agm-marker.service';
import {MapsAPILoader} from '@agm/core';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MarkerInfo} from "../info-sidebar/info-item";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {SharedService} from "../_services/shared.service";
import {SearchService} from "../_services/search.service";

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gMap: ElementRef;
  map: google.maps.Map;
  title = 'Sheet2Map Google leaflet-map';
  lat = Globals.mapCenter[0];
  lng = Globals.mapCenter[1];
  // Coordinates to set the center of the leaflet-map
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  private selectedResult: any;

  constructor(public mapsApiLoader: MapsAPILoader,
              private agmMarkerService: AGMMarkerService,
              private sharedService: SharedService,
              private searchService: SearchService,
              private infoSidebarToggleService: InfoSidebarToggleService) {
    this.mapsApiLoader = mapsApiLoader;
  }

  ngOnInit(): void {
    //Subscribe to search selection to zoom the map to the selected marker
    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
      this.findMarker(this.selectedResult);
    });
  }

  ngAfterViewInit(): void {
    this.mapsApiLoader.load().then(() => {
       this.initMap();
       this.agmMarkerService.createMarkers(this.map);
    });
  }

  private initMap(): void {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    // Google Map options
    this.mapOptions = {
      center: this.coordinates,
      zoom: Globals.mapZoom,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
    // Close info sidebar when leaflet-map is clicked
    this.map.addListener('click', () => {
      this.infoSidebarToggleService.close();
    });
  }
    findMarker(feature): void {
      try {
        let markers = this.agmMarkerService.gMarkers;
        console.log("marker", markers[0].properties);
        console.log(' feature ', feature.value.properties);
          // markers.forEach(e => {let t = e.properties
          //   console.log(t)});
        // return selectedMarker;
        // let LatLng = new google.maps.LatLng(feature.value.geometry.coordinates[1], feature.value.geometry.coordinates[0]);
        // const props = feature.value.properties;
        // console.log('array of markers ', this.agmMarkerService.gMarkers);
        // feature.setAnimation(google.maps.Animation.BOUNCE);
        // feature.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
        // this.newMarkerInfo(feature.markerInfo);
        // this.map.setZoom(17);
        // this.map.panTo(LatLng); // Pan and zoom to selected search result
      } catch (error) {
      }
  }
  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }
}
