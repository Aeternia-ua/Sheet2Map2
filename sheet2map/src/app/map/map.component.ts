import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../_services/marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {
  private map;
  constructor(private markerService: MarkerService) {
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.createMarkers(this.map);
  }
  private initMap(): void {
    this.map = L.map('map', {
      center: [49.8397, 24.0297],
      zoom: 8
    });
    // This is the Carto Positron basemap
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
  }

}



