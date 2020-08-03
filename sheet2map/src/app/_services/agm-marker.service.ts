import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public markersData = Globals.dataURL;
  // agmMap: google.maps.Map;

  constructor(private http: HttpClient) { }

  createMarkers(map: agmMap): void {
    this.http.get(this.markersData).subscribe((res: any) => {
      for (const c of res.features) {
        const LatLng = new google.maps.LatLng(c.geometry.coordinates[1], c.geometry.coordinates[0]);
        // console.log(LatLng.lat(), LatLng.lng());
        const marker = new google.maps.Marker({
          position: LatLng,
          title: 'Hello World!'
        });
        marker.setMap(map);
        console.log(marker);
      }
    });

  }

}
