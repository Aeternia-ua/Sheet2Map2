import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from './info-sidebar/ad-item';
import { InfoSidebarService } from './_services/info-sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sheet2map';
  public appTemplate = 'leaflet-template';
  markersData: MarkerInfo[];

  constructor(private infoSidebarService: InfoSidebarService) { }

  ngOnInit(): void {
    this.markersData = this.infoSidebarService.getMarkerInfo();
  }

  toggleAppTemplate(): void {
    this.appTemplate = this.appTemplate === 'agm-template' ? 'leaflet-template' : 'agm-template';
  }

}


