import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import {LeafletGeolocationService} from './leaflet-geolocation.service';
import {GeolocationControlService} from './geolocation-control.service';

@Injectable({
  providedIn: 'root'
})
export class LeafletGeolocationControlService {
  geolocationBtnIsActive: boolean;

  constructor(private leafletGeolocationService: LeafletGeolocationService,
              private geolocationControlService: GeolocationControlService) { }

  addGeolocationControl(map: L.map, div): void {
    this.createGeolocationControl(map, div);
    L.control.geolocation = (opts) => {
      return new L.Control.GeolocationControl(opts);
    }
    L.control.geolocation({ position: 'topleft' }).addTo(map);
  }

  private createGeolocationControl(map: L.map, div): L.Control {
    L.Control.GeolocationControl = L.Control.extend({
       onAdd: (map: L.map) => {
         const geolocationDiv = div.nativeElement;
         // const geolocationDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-geolocation-control');
        // geolocationDiv.index = 1;
         this.geolocationControlService.btnStateChange.subscribe(isActive => {
           this.geolocationBtnIsActive = isActive;
           geolocationDiv.addEventListener('click', () => {
            if (this.geolocationBtnIsActive) {
              this.leafletGeolocationService.getUserLocation(map);
            }
            else {
              this.leafletGeolocationService.clearUserLocation(map);
            }
           });
         });
         return geolocationDiv;
         },
      onRemove: (map: L.map) => {
         // Nothing to do here
        }
    });
  }
}
