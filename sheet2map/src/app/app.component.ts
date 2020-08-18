import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MarkerInfo} from './info-sidebar/info-item';
import {SharedService} from './_services/shared.service';
import {MatSidenav} from '@angular/material/sidenav';
import {InfoSidebarToggleService} from './_services/info-sidebar-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'sheet2map';
  markerInfo: typeof MarkerInfo;
  mInfo: MarkerInfo;

  constructor(private sharedService: SharedService,
              private infoSidebarToggleService: InfoSidebarToggleService) {
  }

  ngOnInit(): void {
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
      this.mInfo = mInfo;
    });
  }

  ngAfterViewInit(): void {
  }
}


