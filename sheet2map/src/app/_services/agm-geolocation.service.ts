import { Injectable } from '@angular/core';
import {AGMMarkerService} from './agm-marker.service';

@Injectable({
  providedIn: 'root'
})
export class AgmGeolocationService {

  private userLocation: google.maps.LatLng;
  private userLocationMarker: google.maps.Marker;

  constructor(private agmMarkerService: AGMMarkerService) { }

  getUserLocation(map: google.maps.Map): google.maps.Marker {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const radius = position.coords.accuracy;
        console.log('radius ', radius);
        map.setCenter(this.userLocation);
        this.userLocationMarker = new google.maps.Marker({
          position: this.userLocation,
          map: map
        });

        const circle = new google.maps.Circle({
          center: this.userLocation,
          radius: radius,
          map: map
        });
        // TODO: design custom geoloc marker
        this.agmMarkerService.setIcon(this.userLocationMarker, this.agmMarkerService.defaultColor);
        return this.userLocationMarker;
        }, () => {
        this.handleLocationError(true);
      });
    } else {
      this.handleLocationError(false); // Browser doesn't support Geolocation
    }
    return this.userLocationMarker;
  }
  private handleLocationError(browserHasGeolocation): void {
    window.alert(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}
