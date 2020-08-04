import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public markersData = Globals.dataURL;
  markerClusterer: MarkerClusterer;

  constructor(private http: HttpClient) { }

  createMarkers(map): void {
      const gMarkers = [];
      this.http.get(this.markersData).subscribe((res: any) => {
          for (const c of res.features) {
            const LatLng = new google.maps.LatLng(c.geometry.coordinates[1], c.geometry.coordinates[0]);

            const marker = new google.maps.Marker({
              position: LatLng,
              title: 'Hello World!'
            });

            gMarkers.push(marker);
          }
          // TODO Check if the array is correct
          const markerClusterer = new MarkerClusterer(map, gMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
  }
}
