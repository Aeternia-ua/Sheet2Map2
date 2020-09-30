import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import LatLng = google.maps.LatLng;
import {LeafletMarkerService} from './leaflet-marker.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletGeolocationService {
  private userLocationMarker: L.marker;
  private userLocation: L.latLng;

  constructor(private leafletMarkerService: LeafletMarkerService) { }

  getUserLocation(map: L.map): L.marker {
    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocation = new L.latLng([position.coords.latitude, position.coords.longitude]);
        this.userLocationMarker = new L.marker(this.userLocation);

        // TODO: Create custom user location marker icon
        this.leafletMarkerService.setIcon(this.userLocationMarker, this.leafletMarkerService.highlightedColor);
        this.userLocationMarker.addTo(map);

        const radius = position.coords.accuracy;
        L.circle(this.userLocation, radius).addTo(map);

        map.locate({setView: true});
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
