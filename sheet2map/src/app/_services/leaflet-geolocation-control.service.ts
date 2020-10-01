import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {LeafletGeolocationService} from './leaflet-geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletGeolocationControlService {

  constructor(private leafletGeolocationService: LeafletGeolocationService) { }

  private createGeolocationControl(map): L.Control {
    L.Control.GeolocationControl = L.Control.extend({
      onAdd: (map: L.map) => {
        const el = L.DomUtil.create('div', 'leaflet-bar leaflet-geolocation-control');
        el.innerHTML = '<i class=\'fa fa-location-arrow\' aria-hidden=\'true\'' +
          'title="Your location" style="font-size: 18px"></i>';
        el.addEventListener('click', () => {
          this.leafletGeolocationService.getUserLocation(map);
        });
        return el;
        },
      onRemove: (map: L.map) => {
        // Nothing to do here
        }
    });
  }

  addGeolocationControl(map: L.map): void {
    this.createGeolocationControl(map);
    L.control.geolocation = (opts) => {
      return new L.Control.GeolocationControl(opts);
    }
    L.control.geolocation({ position: 'topleft' }).addTo(map);
}
}
