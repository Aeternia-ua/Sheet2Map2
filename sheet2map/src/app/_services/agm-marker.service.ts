import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';
import {AgmMarkerIcon} from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/info-item';
import {SharedMarkerInfoService} from './shared-marker-info.service';
import {JsonService} from './json.service';
import {MarkerService} from './marker.service';
import {Observable} from 'rxjs';
import {Marker} from '../marker';

@Injectable({
  providedIn: 'root'
})
export class AGMMarkerService {
  public json = Globals.dataURL;
  public markers: Observable<any[]>;
  public agmMarkers: any[];
  public markerInfo: MarkerInfo;
  markerClusterer: MarkerClusterer;
  agmMarkerIcon: AgmMarkerIcon;
  private clusteringOptions: any;
  public clusterMarkers: any[];
  selectedMarker: google.maps.Marker;

  constructor(private jsonService: JsonService,
              private markerService: MarkerService,
              private sharedService: SharedMarkerInfoService) { }

  createMarkers(map, markers: any[]): any {
      this.agmMarkers = [];
      for (const marker of markers) {
        const feature = marker.feature;
        const LatLng = new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        let agmMarker: any;
        agmMarker = new google.maps.Marker({
          position: LatLng,
          animation: null,
          optimized: false // Unoptimized markers exist as img elements inside the markerLayer mapPane
        });
        agmMarker.markerID = marker.markerID;
        agmMarker.searchProperty = marker.searchProperty;
        agmMarker.representativeProperty = marker.representativeProperty;
        agmMarker.markerInfo = marker.markerInfo;
        this.setIcon(agmMarker, 'blue2');
        this.agmMarkers.push(agmMarker);

        agmMarker.addListener('click', () => { // Get marker info on click
          this.newMarkerInfo(agmMarker.markerInfo);
          this.select(agmMarker);
          this.selectedMarker = agmMarker;
        });
      }
      this.clusteringOptions = {
        maxZoom: 10,
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      };
      this.markerClusterer = new MarkerClusterer(map, this.agmMarkers, this.clusteringOptions);
      this.clusterMarkers = this.markerClusterer.getMarkers();
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  private select(marker: google.maps.Marker): void {
    if (this.selectedMarker) { // Set previously selected marker back to default state
      this.selectedMarker.setAnimation(null); }
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  private setIcon(marker, color): void {
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
