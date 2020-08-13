import {Injectable, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.awesome-markers';
import { Globals } from '../globals';
import { MarkerIcon } from '../interfaces/marker-icon';
import {InfoSidebarService} from './info-sidebar.service';
import {MarkerInfo} from '../info-sidebar/info-item';
import {InfoSidebarComponent} from '../info-sidebar/info-sidebar.component';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {

  constructor(private http: HttpClient,
              private infoSidebarService: InfoSidebarService,
              private infoSidebarComponent: InfoSidebarComponent,
              private sharedService: SharedService,
              ) { }

  public markersData = Globals.dataURL;
  markerClusterGroup: L.markerClusterGroup;
  markerIcon: MarkerIcon;
  public markerInfo: MarkerInfo;

  createMarkers(map: L.map): void {
    const markerClusterGroup = new L.markerClusterGroup();

    this.http.get(this.markersData).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        // Accessing feature properties
        const props = c.properties;
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
    this.markerIcon = L.AwesomeMarkers.icon(
          {markerColor: 'red', prefix: 'fa', icon: 'plus'}
          );
    marker.setIcon(this.markerIcon);
  }
}




