import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  public markersData = Globals.dataURL;

  constructor(private http: HttpClient) { }

  createMarkers(map: L.map): void {
    this.http.get(this.markersData).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        let marker: any;
        marker = L.marker([lon, lat])
          .addTo(map);
      }
    });
  }
}

