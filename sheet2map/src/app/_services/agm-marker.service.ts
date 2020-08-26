import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';
import {AgmMarkerIcon} from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/info-item';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';
import {SharedService} from './shared.service';
import {JsonService} from "./json.service";

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public json = Globals.dataURL;
  public markerInfo: MarkerInfo;
  markerClusterer: MarkerClusterer;
  agmMarkerIcon: AgmMarkerIcon;

  constructor(private http: HttpClient,
              private jsonService: JsonService,
              private sharedService: SharedService) { }

  createMarkers(map): void {
      const gMarkers = [];
      this.jsonService.getFeatures().subscribe((features: any) => {
          for (const feature of features) {
            const LatLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
            const props = feature.properties;
            let marker: any;
            marker = new google.maps.Marker({
              position: LatLng,
            });
            marker.properties = props;
            marker.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
            this.createMarkerIcon(marker, 'blue2');
            gMarkers.push(marker);

            marker.addListener('click', (e) => {
              // Get marker info on click
              this.newMarkerInfo(marker.markerInfo);
            });
          }
          this.markerClusterer = new MarkerClusterer(map, gMarkers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    });
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  private createMarkerIcon(marker, color): void {
    let url = '../../assets/img/';
    url += color + '.svg';
    this.agmMarkerIcon = {
      label: {
        fontFamily: 'Fontawesome',
        text: '\uf299'
      },
      icon: {
        url: url,
        scaledSize: new google.maps.Size(45, 45)
      }
    };
    marker.setOptions(this.agmMarkerIcon);
  }
}
