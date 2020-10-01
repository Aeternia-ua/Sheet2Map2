import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import LatLng = google.maps.LatLng;
import {LeafletMarkerService} from './leaflet-marker.service';
import {GeoLocator} from '../geoLocator.class';

@Injectable({
  providedIn: 'root'
})
export class LeafletGeolocationService {
  private userLocationMarker: L.marker;
  private userLocation: L.latLng;

  constructor(private leafletMarkerService: LeafletMarkerService) { }

  getUserLocation(map: L.map): L.marker {
    const locator: GeoLocator = new GeoLocator();
    locator.UserLocation.subscribe(location => {
      if (location) {
        this.userLocation = new L.latLng([location.latitude, location.longitude]);
        this.userLocationMarker = new L.marker(this.userLocation);
        // TODO: Create custom user location marker icon
        this.leafletMarkerService.setIcon(this.userLocationMarker, this.leafletMarkerService.highlightedColor);
        this.userLocationMarker.addTo(map);
        L.circle(this.userLocation, location.accuracy).addTo(map);
        map.locate({setView: true});
      }
    });
    return this.userLocationMarker;
  }
}
