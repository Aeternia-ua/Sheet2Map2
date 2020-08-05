import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';
import { Globals } from '../globals';
import { MarkerIcon } from '../interfaces/marker-icon';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private http: HttpClient) { }
  public markersData = Globals.dataURL;
  markerClusterGroup: L.markerClusterGroup;
  markerIcon: MarkerIcon;

  createMarkers(map: L.map): void {
    const markerClusterGroup = new L.markerClusterGroup();

    this.http.get(this.markersData).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        let marker: any;
        marker = L.marker([lon, lat]);
        this.createMarkerIcon(marker);

        markerClusterGroup.addLayer(marker);
      }
      map.addLayer(markerClusterGroup);

    });
  }

  private createMarkerIcon(marker): void {
    // Using MarkerIcon interface
    this.markerIcon = L.AwesomeMarkers.icon(
          {markerColor: 'red', prefix: 'fa', icon: 'plus'}
        );
    marker.setIcon(this.markerIcon);
  }
}


