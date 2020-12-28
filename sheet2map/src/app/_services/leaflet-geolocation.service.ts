import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {LeafletMarkerService} from './leaflet-marker.service';
import {GeoLocator} from '../geoLocator.class';

@Injectable({
  providedIn: 'root'
})
export class LeafletGeolocationService {
  private userLocationMarker: L.marker = null;
  private userLocation: L.latLng = null;
  private userLocationRadius: L.circle = null;

  private locationIcon = L.icon({
    iconUrl: '../../assets/img/location.svg',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [10, 10] // point of the icon which will correspond to marker's location
});

  constructor(private leafletMarkerService: LeafletMarkerService) { }

  getUserLocation(map: L.map): void {
    const locator: GeoLocator = new GeoLocator();
    locator.UserLocation.subscribe(location => {
      if (location) {
        this.userLocation = new L.latLng([location.latitude, location.longitude]);
        if (this.userLocationMarker === null && this.userLocationRadius === null) {
          this.userLocationMarker = new L.marker(this.userLocation, {icon: this.locationIcon});
          // TODO: Create custom user location marker icon
          // this.leafletMarkerService.setIcon(this.userLocationMarker, this.leafletMarkerService.highlightedColor);
          // this.leafletMarkerService.setIcon(this.userLocationMarker, this.locationIcon);
          this.userLocationMarker.addTo(map);
          this.userLocationRadius = new L.circle(this.userLocation, location.accuracy).addTo(map);
          map.locate({setView: true});
        }
      }
    });
  }
    clearUserLocation(map): void {
    if (this.userLocationRadius && this.userLocationMarker) {
      map.removeLayer(this.userLocationMarker);
      this.userLocationMarker = null;
      map.removeLayer(this.userLocationRadius);
      this.userLocationRadius = null;
    }
  }
}
