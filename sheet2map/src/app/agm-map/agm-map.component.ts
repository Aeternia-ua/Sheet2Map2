import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Globals } from '../globals';
import { AGMMarkerService } from '../_services/agm-marker.service';
import {MapsAPILoader} from '@agm/core';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MarkerInfo} from "../info-sidebar/info-item";
import {MarkerInfoComponent} from "../marker-info/marker-info.component";
import {SharedService} from "../_services/shared.service";
import {SearchService} from "../_services/search.service";
import {MarkerService} from "../_services/marker.service";
import {Observable, Subject, timer} from "rxjs";
import {mapTo, share, tap} from "rxjs/operators";

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
  // Coordinates to set the center of the map
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  private selectedResult: any;
  readonly markers: Observable<any[]> = this.markerService.getMarkers().pipe(share());

  constructor(public mapsApiLoader: MapsAPILoader,
              private markerService: MarkerService,
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
       // Subscribe to shared observable 'markers'
       this.markers.subscribe(markers => {
         this.agmMarkerService.createMarkers(this.map, markers)
       })
    });
  }

  private initMap(): void {
    console.log('init map');
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    // Google Map options
    this.mapOptions = {
      center: this.coordinates,
      zoom: Globals.mapZoom,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
    // Close info sidebar when map is clicked
    this.map.addListener('click', () => {
      this.infoSidebarToggleService.close();
    });
  }
    findMarker(marker): void {
      try {
        const agmMarkers = this.agmMarkerService.agmMarkers;
        const selectedMarkerId = marker.value.id;
        console.log('selected via search marker ', marker.value, selectedMarkerId);
        console.log('the same marker from google maps markers ', agmMarkers[0].id);
        let selectedMarker = agmMarkers.find(agmMarker => agmMarker.id === selectedMarkerId);
        console.log( 'google maps marker match is --- ', selectedMarker);
        let LatLng = new google.maps.LatLng(selectedMarker.value.feature.geometry.coordinates[1], selectedMarker.value.feature.geometry.coordinates[0]);
        this.map.panTo(LatLng);
        return selectedMarker;

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
            console.log('search input undefined');
        }
      }
}
