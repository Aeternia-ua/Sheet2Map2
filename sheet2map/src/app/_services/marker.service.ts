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

@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  constructor(private http: HttpClient,
              private jsonService: JsonService,
              private infoSidebarComponent: InfoSidebarComponent,
              private sharedService: SharedService,
              ) { }

  public json = Globals.dataURL;
  markerClusterGroup: L.markerClusterGroup;
  markerIcon: MarkerIcon;
  public markerInfo: MarkerInfo;

  createMarkers(map: L.map): void {
  const markerClusterGroup = new L.markerClusterGroup();

  this.jsonService.getFeatures().subscribe((features: any) => {

    for (const feature of features) {
      const lat = feature.geometry.coordinates[0];
      const lon = feature.geometry.coordinates[1];
      // Accessing feature properties
      const props = feature.properties;
      let marker: any;
      // TODO Use json feature property lat and lon
      marker = new L.marker([lon, lat]);
      marker.properties = props;
      marker.markerInfo = new MarkerInfo(MarkerInfoComponent, { ...props });
      marker
        .on('click', (e) => {
          this.newMarkerInfo(e.target.markerInfo);
        });

      this.createMarkerIcon(marker);
      markerClusterGroup.addLayer(marker);
    }
    map.addLayer(markerClusterGroup);
  });
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




