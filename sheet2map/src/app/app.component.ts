import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MarkerInfo} from './info-sidebar/marker-info.class';
import {SharedMarkerInfoService} from './_services/shared-marker-info.service';
// import {MatSidenav} from '@angular/material/sidenav';
import {InfoSidebarToggleService} from './_services/info-sidebar-toggle.service';
import {SearchService} from "./_services/search.service";
import {MarkerService} from "./_services/marker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'sheet2map';
  markerInfo: typeof MarkerInfo;
  mInfo: MarkerInfo;
  selectedResult: any;
  private markers: any;

  constructor(private markerService: MarkerService,
              private sharedService: SharedMarkerInfoService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
      this.mInfo = mInfo;
    });

    this.searchService.sharedSelectedResult.subscribe(selectedResult => {
      this.selectedResult = selectedResult;
    });
  }

  ngAfterViewInit(): void {
  }
}


