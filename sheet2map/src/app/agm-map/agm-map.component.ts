import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Globals } from '../globals';
import { AGMMarkerService } from '../_services/agm-marker.service';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.css']
})
export class AgmMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gMap: ElementRef;
  agmMap: google.maps.Map;
  title = 'Sheet2Map Google map';
  lat = Globals.mapCenter[0];
  lng = Globals.mapCenter[1];
  // Coordinates to set the center of the map
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;

  constructor(public mapsApiLoader: MapsAPILoader,
              private agmMarkerService: AGMMarkerService) {
     this.mapsApiLoader = mapsApiLoader;

     this.mapsApiLoader.load().then(() => {
       this.initMap();
    });
  }
  ngAfterViewInit(): void {
  }

  private initMap(): void {
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    // Google Map options
    this.mapOptions = {
      center: this.coordinates,
      zoom: Globals.mapZoom
    };
    this.agmMap = new google.maps.Map(this.gMap.nativeElement, this.mapOptions);
    console.log("this.gMap ", this.gMap);
    this.agmMarkerService.createMarkers(this.agmMap);
  }
}
