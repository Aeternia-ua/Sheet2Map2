import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from './info-sidebar/info-item';
import { InfoSidebarService } from './_services/info-sidebar.service';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sheet2map';
  public appTemplate = 'leaflet-template';
  markersData: MarkerInfo[];
  markerInfo: MarkerInfo[];

  constructor(private infoSidebarService: InfoSidebarService) { }

  ngOnInit(): void {
    this.markersData = this.infoSidebarService.getMarkerInfo();
    // console.log("this json ", this.json);
    // this.markerInfo = this.infoSidebarService.getMarkerInfo2(this.json);
  }

  toggleAppTemplate(): void {
    this.appTemplate = this.appTemplate === 'agm-template' ? 'leaflet-template' : 'agm-template';
  }

}


