import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import MarkerClusterer from '@google/markerclustererplus';
import { Globals } from '../globals';
// import {AgmMarkerIcon} from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {SharedMarkerInfoService} from './shared-marker-info.service';
import {JsonService} from './json.service';
import {MarkerService} from './marker.service';
import {Observable} from 'rxjs';
import {Marker} from '../marker.class';
import {AgmMarkerIcon} from '../_interfaces/marker-icon';

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
  public defaultColor = 'blue2';
  private clusteringOptions: any;
  public clusteredMarkers: any[];
  selectedMarker: google.maps.Marker;

  constructor(private jsonService: JsonService,
              private markerService: MarkerService,
              private sharedService: SharedMarkerInfoService) { }

  createMarkers(map: google.maps.Map, markers: Marker[]): void {
      this.agmMarkers = [];
      markers.forEach(marker => {
        const feature = marker.Feature;
        const LatLng = new google.maps.LatLng(feature.Geometry.coordinates[1], feature.Geometry.coordinates[0]);
        let agmMarker: any;
        agmMarker = new google.maps.Marker({
          position: LatLng,
          animation: null,
          optimized: true // Unoptimized markers exist as img elements inside the markerLayer mapPane
        });
        agmMarker.markerID = marker.MarkerID;
        agmMarker.properties = marker.Feature.Properties;
        agmMarker.searchProperty = marker.SearchProperty;
        agmMarker.representativeProperty = marker.RepresentativeProperty;
        agmMarker.markerInfo = marker.MarkerInfo;
        this.setIcon(agmMarker, this.defaultColor);
        this.agmMarkers.push(agmMarker);

        agmMarker.addListener('click', () => {
          this.newMarkerInfo(agmMarker.markerInfo); // Get marker info on click
          this.select(agmMarker); // First, change the state of marker to 'selected'
          this.selectedMarker = agmMarker; // Then, reassign var to deselect this marker on next marker click
        });
      })

      this.clusteringOptions = { // Create marker clusterer
        maxZoom: 10,
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      };
      this.markerClusterer = new MarkerClusterer(map, this.agmMarkers, this.clusteringOptions);
      this.clusteredMarkers = this.markerClusterer.getMarkers();
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  private select(marker: google.maps.Marker): void {
    if (this.selectedMarker) { // Set previously selected marker back to default state
      this.selectedMarker.setAnimation(null); }
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  deselect(marker): google.maps.Marker {
    if (marker) { return marker.setAnimation(null); }
  }

  public setIcon(marker: google.maps.Marker, color): void {
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

  public updateMarkers(filteredMarkers: Marker[]): MarkerClusterer {
    this.markerClusterer.clearMarkers();
    if (filteredMarkers.length >= 0) {
    const filteredClusteredMarkers: any[] = [];
    filteredMarkers.forEach(marker => {
      const filteredMarker = this.clusteredMarkers.find(gmarker => gmarker.markerID === marker.MarkerID);
      filteredClusteredMarkers.push(filteredMarker);
    });
    this.markerClusterer.addMarkers(filteredClusteredMarkers);
    return this.markerClusterer;
    }
    else { // If filtered markers undefined
      this.markerClusterer.addMarkers(this.clusteredMarkers);
      return this.markerClusterer;
    }
  }
}
