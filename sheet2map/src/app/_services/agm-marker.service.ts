import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';
import {AgmMarkerIcon} from '../interfaces/marker-icon';

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public markersData = Globals.dataURL;
  markerClusterer: MarkerClusterer;
  agmMarkerIcon: AgmMarkerIcon;

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
            this.createMarkerIcon(marker, 'blue');
            gMarkers.push(marker);
          }
          const markerClusterer = new MarkerClusterer(map, gMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
  }
    private createMarkerIcon(marker, color): void {
      let url = 'http://maps.google.com/mapfiles/ms/icons/';
      url += color + '-dot.png';
      this.agmMarkerIcon = {
        label: {
          fontFamily: 'Fontawesome',
          text: '\uf299'
        },
        icon: {
          url: url,
          scaledSize: new google.maps.Size(40, 40)
        }
      };
      marker.setOptions(this.agmMarkerIcon);
      }
}
