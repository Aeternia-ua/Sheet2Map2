import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) { }
  public markersData = Globals.dataURL;
  markerClusterGroup: L.markerClusterGroup;

  createMarkers(map: L.map): void {
    const markerClusterGroup = new L.markerClusterGroup();

    this.http.get(this.markersData).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        let marker: any;
        marker = L.marker([lon, lat]);

        markerClusterGroup.addLayer(marker);
      }
      map.addLayer(markerClusterGroup);

    });
  }
}


