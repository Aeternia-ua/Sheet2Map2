import {Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';
import { Globals } from '../globals';
import { MarkerIcon } from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarComponent} from '../info-sidebar/info-sidebar.component';
import {SharedMarkerInfoService} from './shared-marker-info.service';
import {MarkerService} from "./marker.service";

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
  markerClusterGroup: L.markerClusterGroup;
  markerIcon: MarkerIcon;
  public markerInfo: MarkerInfo;
  public clusterMarkers: VRLayer[];
  selectedMarker: L.marker;
  public defaultColor = 'blue'; // TODO: Create config for styling default and selected marker
  public hightlightedColor = 'red';
  public layers: any[] = [];

  createMarkers(map: L.map, markers: any[]): any {
  const markerClusterGroup = new L.markerClusterGroup();
  for (const marker of markers) {
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
      markerClusterGroup.addLayer(lMarker);
  }
  map.addLayer(markerClusterGroup);
  // TODO: You are using only layers[1] to toggle zoom on marker inside marker cluster
  map.eachLayer(layer => this.layers.push(layer));
  // TODO
  this.clusterMarkers = markerClusterGroup.getLayers();
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  private select(marker: L.marker): void {
    if (this.selectedMarker) { // Set previously selected marker back to default state
      this.setIcon(this.selectedMarker, this.defaultColor);
    }
    this.setIcon(marker, this.hightlightedColor);
  }

  public setIcon(marker, color): void {
    // Using MarkerIcon interface
    this.markerIcon = L.AwesomeMarkers.icon({
            markerColor: color,
            prefix: 'fa', icon: 'plus'
    });
    marker.setIcon(this.markerIcon);
  }

  // private getFlattenedMarkers(layers): void {
  //   const markers: any[] = [];
  //   for (const layer of layers) {
  //       if (layer.getChildCount) {
  //         markers.push(layer.getAllChildMarkers());
  //       } else if (layer instanceof L.Marker) {
  //         markers.push(layer);
  //       }
  //     }
  //   this.flattenedMarkers = [].concat(... markers);
  // }
}




