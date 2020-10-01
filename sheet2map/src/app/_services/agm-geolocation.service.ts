import { Injectable } from '@angular/core';
import {AGMMarkerService} from './agm-marker.service';
import {GeoLocator} from '../geoLocator.class';

@Injectable({
  providedIn: 'root'
})
export class AgmGeolocationService {

  private userLocation: google.maps.LatLng;
  private userLocationMarker: google.maps.Marker;

  constructor(private agmMarkerService: AGMMarkerService) {
  }

  getUserLocation(map: google.maps.Map): google.maps.Marker {
    const locator: GeoLocator = new GeoLocator();
    locator.UserLocation.subscribe(location => {
      if (location) {
        this.userLocation = new google.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(this.userLocation);
        this.userLocationMarker = new google.maps.Marker({
          position: this.userLocation,
          map: map
        });
        const circle = new google.maps.Circle({
          center: this.userLocation,
          radius: location.accuracy,
          map: map
        });
        // TODO: design custom geolocation marker
        this.agmMarkerService.setIcon(this.userLocationMarker, this.agmMarkerService.defaultColor);
      }
    });
    return this.userLocationMarker;
  }
}
