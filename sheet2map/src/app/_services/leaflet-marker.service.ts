import {Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';
import { Globals } from '../globals';
import { MarkerIcon } from '../_interfaces/marker-icon';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarComponent} from '../info-sidebar/info-sidebar.component';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';
import {SharedService} from './shared.service';
import {JsonService} from "./json.service";
import {MarkerService} from "./marker.service";

@Injectable({
  providedIn: 'root'
})

export class LeafletMarkerService {

  constructor(private http: HttpClient,
              private markerService: MarkerService,
              private infoSidebarComponent: InfoSidebarComponent,
              private sharedService: SharedService,
              ) { }

  public json = Globals.dataURL;
  markerClusterGroup: L.markerClusterGroup;
  markerIcon: MarkerIcon;
  public markerInfo: MarkerInfo;

  createMarkers(map: L.map, markers: any[]): any {
  const markerClusterGroup = new L.markerClusterGroup();
  console.log('marker [0] from leaflet ', markers[0], markers[0].markerID);
  for (const marker of markers) {
      const feature = marker.feature;
      const lat = feature.geometry.coordinates[0];
      const lng = feature.geometry.coordinates[1];
      // Accessing feature properties
      // const props = feature.properties;
      let lMarker: any;
      lMarker = new L.marker([lng, lat]);
      lMarker.markerID = marker.markerID;
      lMarker.markerInfo = marker.markerInfo;

      lMarker
        .on('click', (e) => {
          this.newMarkerInfo(e.target.markerInfo);
        });

      this.createMarkerIcon(lMarker);
      markerClusterGroup.addLayer(lMarker);
    }
  map.addLayer(markerClusterGroup);
  }

  newMarkerInfo(mInfo): void {
    this.sharedService.nextMarkerInfo(mInfo);
  }

  private createMarkerIcon(marker): void {
    // Using MarkerIcon interface
    this.markerIcon = L.AwesomeMarkers.icon({
            markerColor: 'red',
            prefix: 'fa', icon: 'plus'
    });
    marker.setIcon(this.markerIcon);
  }

}




