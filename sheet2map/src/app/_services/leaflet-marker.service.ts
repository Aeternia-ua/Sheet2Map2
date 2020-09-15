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
import {MarkerService} from "./marker.service";
import {Marker} from '../marker.class';

@Injectable({
  providedIn: 'root'
})

export class LeafletMarkerService {

  constructor(private http: HttpClient,
              private markerService: MarkerService,
              private infoSidebarComponent: InfoSidebarComponent,
              private sharedService: SharedMarkerInfoService,
              ) { }

  public json = Globals.dataURL;
  markerClusterGroup;
  markerIcon: LeafletMarkerIcon;
  public markerInfo: MarkerInfo;
  // public clusteredMarkers: VRLayer[];
  public clusteredMarkers: any[];
  selectedMarker: L.marker;
  public defaultColor = 'blue'; // TODO: Create config for styling default and selected marker
  public hightlightedColor = 'red';
  public layers: any[] = [];

  createMarkers(map: L.map, markers: any[]): any {
    this.markerClusterGroup = new L.markerClusterGroup();
    markers.forEach(marker => {
      const feature = marker.feature;
      const lat = feature.geometry.coordinates[0];
      const lng = feature.geometry.coordinates[1];
      let lMarker: any;
      lMarker = new L.marker([lng, lat]);
      lMarker.markerID = marker.markerID;
      lMarker.markerInfo = marker.markerInfo;

      lMarker
        .on('click', (e) => {
          this.newMarkerInfo(e.target.markerInfo);
          this.select(e.target);
          this.selectedMarker = e.target;
        });

      this.setIcon(lMarker, this.defaultColor);
      this.markerClusterGroup.addLayer(lMarker);
    })
    map.addLayer(this.markerClusterGroup);
  // TODO: You are using only layers[1] to toggle zoom on marker inside marker cluster
    map.eachLayer(layer => this.layers.push(layer));
    this.clusteredMarkers = this.markerClusterGroup.getLayers();
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  public updateMarkers(markers): void {
    const filteredMarkers: any[] = [];
    markers.forEach(marker => {
      const filteredMarker = this.clusteredMarkers.find(lmarker => lmarker.markerID === marker.MarkerID);
      filteredMarkers.push(filteredMarker);
    });
    this.markerClusterGroup.clearLayers(); // Update marker clusterer
    if (filteredMarkers.length > 0) {
      this.markerClusterGroup.addLayers(filteredMarkers);
    }
    else {
      this.markerClusterGroup.addLayer(this.clusteredMarkers);
    }
  }

  private select(marker: L.marker): void {
    if (this.selectedMarker) { // Set previously selected marker back to default state
      this.setIcon(this.selectedMarker, this.defaultColor);
    }
    this.setIcon(marker, this.hightlightedColor);
  }

  public setIcon(marker, color): void { // Using MarkerIcon interface
    this.markerIcon = L.AwesomeMarkers.icon({
            markerColor: color,
            prefix: 'fa', icon: 'plus'
    });
    marker.setIcon(this.markerIcon);
  }
}




