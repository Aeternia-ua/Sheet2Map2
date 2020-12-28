import { Injectable } from '@angular/core';
import {AGMMarkerService} from './agm-marker.service';
import {GeoLocator} from '../geoLocator.class';

@Injectable({
  providedIn: 'root'
})
export class AgmGeolocationService {

  private userLocation: google.maps.LatLng;
  private userLocationMarker: google.maps.Marker = null;
  private userLocationRadius: google.maps.Circle = null;

  constructor(private agmMarkerService: AGMMarkerService) {
  }

  getUserLocation(map: google.maps.Map): void {
    const locator: GeoLocator = new GeoLocator();
    locator.UserLocation.subscribe(location => {
      if (location) {
        this.userLocation = new google.maps.LatLng(location.latitude, location.longitude);
        if (this.userLocationMarker === null && this.userLocationRadius === null) {
          const locationIcon = {
            url: '../../assets/img/location.svg',
            scaledSize: new google.maps.Size(20, 20),
            anchor: new google.maps.Point(10, 10)
          };

          this.userLocationMarker = new google.maps.Marker({position: this.userLocation,
            map: map,
            icon: locationIcon
          });
          this.userLocationRadius = new google.maps.Circle({
            center: this.userLocation,
            radius: location.accuracy,
            map: map,
            strokeColor: 'rgb(51, 136, 255)',
            fillColor: 'rgb(51, 136, 255)',
            strokeWeight: 3
          });
          // TODO: design custom geolocation marker
          // this.agmMarkerService.setIcon(this.userLocationMarker, this.agmMarkerService.defaultColor);
          map.setCenter(this.userLocation);
        }
      }
    });
  }

  clearUserLocation(): void {
    if (this.userLocationRadius && this.userLocationMarker) {
      this.userLocationMarker.setMap(null);
      this.userLocationMarker = null;
      this.userLocationRadius.setMap(null);
      this.userLocationRadius = null;
    }
  }
}
