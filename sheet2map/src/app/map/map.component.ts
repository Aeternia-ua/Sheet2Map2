import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../_services/marker.service';
import { Globals } from '../globals';
import { DataModelService } from '../_services/data-model.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements AfterViewInit {
  private map;
  public source = Globals.dataURL;
  private json = Globals.json;
  private dataModel = [];

  constructor(private markerService: MarkerService,
              private dataModelService: DataModelService) {
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.createMarkers(this.map);
    this.buildDataModel();

  }
  private initMap(): void {
    this.map = L.map('map', {
      // Leaflet map options
      center: Globals.mapCenter,
      zoom: Globals.mapZoom
    });
    // This is the Carto Positron basemap
    const basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: Globals.mapMaxZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    basemap.addTo(this.map);
  }

  private buildDataModel(): void {
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          this.dataModel = this.dataModelService.createDataTemplate(jsonData);
          Globals.dataModel.fill(this.dataModel);
          console.log("resulting dataModel: " + this.dataModel);
        }
    );
  }

}



