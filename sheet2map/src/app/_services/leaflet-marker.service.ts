import {Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';
import { Globals } from '../globals';
import {LeafletMarkerIcon} from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {InfoSidebarComponent} from '../info-sidebar/info-sidebar.component';
import {SharedMarkerInfoService} from './shared-marker-info.service';
import {MarkerService} from './marker.service';
import {Marker} from '../marker.class';

@Injectable({
  providedIn: 'root'
})

export class LeafletMarkerService {

  constructor(private http: HttpClient,
              private markerService: MarkerService,
              private infoSidebarComponent: InfoSidebarComponent,
              private sharedService: SharedMarkerInfoService) { }

  public json = Globals.dataURL;
  markerClusterGroup;
  markerIcon: LeafletMarkerIcon;
  public markerInfo: MarkerInfo;
  public clusteredMarkers: any[];
  selectedMarker: L.marker;
  public defaultColor = 'blue'; // TODO: Create config for styling default and selected marker
  public highlightedColor = 'red';
  public layers: any[] = [];

  createMarkers(map: L.map, markers: Marker[]): void {
    this.markerClusterGroup = new L.markerClusterGroup();
    markers.forEach(marker => {
      const feature = marker.Feature;
      const lat = feature.Geometry.coordinates[0];
      const lng = feature.Geometry.coordinates[1];
      let lMarker: any;
      lMarker = new L.marker([lng, lat]);
      lMarker.markerID = marker.MarkerID;
      lMarker.markerInfo = marker.MarkerInfo;

      lMarker
        .on('click', (e) => {
          this.newMarkerInfo(e.target.markerInfo);
          this.selectedMarker = e.target;
          this.select(this.selectedMarker);
        });

      this.setIcon(lMarker, this.defaultColor);
      this.markerClusterGroup.addLayer(lMarker);
    });

    map.addLayer(this.markerClusterGroup);
    console.log('this.markerClusterGroup ', this.markerClusterGroup);
    // TODO: You are using only layers[1] to toggle zoom on marker inside marker cluster
    map.eachLayer(layer => this.layers.push(layer));
    this.clusteredMarkers = this.markerClusterGroup.getLayers(); // Get clustered markers
  }

  newMarkerInfo(mInfo: MarkerInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  public updateMarkers(filteredMarkers: Marker[]): any {
    this.markerClusterGroup.clearLayers(); // Clear marker clusterer
    if (filteredMarkers.length >= 0) {
      const filteredClusteredMarkers: any[] = [];
      filteredMarkers.forEach(marker => {
        const filteredLMarker: L.marker = this.clusteredMarkers
          .find(lmarker => lmarker.markerID === marker.MarkerID);
        filteredClusteredMarkers.push(filteredLMarker);
      });
      this.markerClusterGroup.addLayers(filteredClusteredMarkers); // Add filtered Leaflet markers to clusterer
      return this.markerClusterGroup;
    }
      else { // If filtered markers undefined
        this.markerClusterGroup.addLayers(this.clusteredMarkers);
        return this.markerClusterGroup;
      }
  }

  private select(marker: L.marker): void {
    if (this.selectedMarker) { // Set previously selected marker icon back to default
      this.setIcon(this.selectedMarker, this.defaultColor);
    }
    this.setIcon(marker, this.highlightedColor);
  }

  public setIcon(marker: L.marker, color): void { // Using MarkerIcon interface
    this.markerIcon = L.AwesomeMarkers.icon({
            markerColor: color,
            prefix: 'fa', icon: 'plus'
    });
    marker.setIcon(this.markerIcon);
  }
}




