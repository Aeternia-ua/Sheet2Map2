import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';
import {AgmMarkerIcon} from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/info-item';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';
import {SharedService} from './shared.service';
import {JsonService} from "./json.service";
import {Marker} from "../marker";
import {MarkerService} from "./marker.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public json = Globals.dataURL;
  public markers: any[];
  public agmMarkers: any[];
  public markerInfo: MarkerInfo;
  markerClusterer: MarkerClusterer;
  agmMarkerIcon: AgmMarkerIcon;
  private clusteringOptions: any;

  constructor(private http: HttpClient,
              private jsonService: JsonService,
              private markerService: MarkerService,
              private sharedService: SharedService) { }

  createMarkers(map): void {
    // this.markerService.createMarkers().subscribe((markers: any[]) => {
      this.markers = this.markerService.markers;
      this.agmMarkers = [];

      for (const marker of this.markers) {
        const id = marker.id;
        const feature = marker.feature;
        const LatLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        const properties = feature.properties;
        let agmMarker: any;
        agmMarker = new google.maps.Marker({
          position: LatLng,
        });
        agmMarker.id = id;
        agmMarker.properties = properties;
        agmMarker.markerInfo = new MarkerInfo(MarkerInfoComponent, {...properties});
        this.createMarkerIcon(agmMarker, 'blue2');
        this.agmMarkers.push(agmMarker);
        // console.log('agmmarker ', agmMarker);

        agmMarker.addListener('click', () => {// Get marker info on click
          this.newMarkerInfo(agmMarker.markerInfo);
        });

      };
      this.clusteringOptions = {
        maxZoom: 10,
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      };
      this.markerClusterer = new MarkerClusterer(map, this.agmMarkers, this.clusteringOptions);

    // })
  };

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
