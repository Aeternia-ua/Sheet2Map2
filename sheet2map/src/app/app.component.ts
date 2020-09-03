import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MarkerInfo} from './info-sidebar/info-item';
import {SharedService} from './_services/shared.service';
import {MatSidenav} from '@angular/material/sidenav';
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
              private sharedService: SharedService,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    // TODO: Check whether it is reasonable create markers in parent component
    // this.markerService.createMarkers().subscribe((markers: any[]) => {
    //   this.markers = this.markerService.markers;
    // });
    // console.log('app component markers ', this.markers);
    // this.markerService.createMarkers();
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


