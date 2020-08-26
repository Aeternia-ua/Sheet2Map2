import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MarkerInfo} from '../info-sidebar/info-item';
import {SharedService} from '../_services/shared.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Globals} from '../globals';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('markerInfoSidebar', {static: true}) markerInfoSidebar: MatSidenav;
  @Input()mInfo: MarkerInfo;

  constructor(private sharedService: SharedService,
              private changeDetectorRef: ChangeDetectorRef,
              private infoSidebarToggleService: InfoSidebarToggleService) { }

  ngOnInit(): void {
    this.infoSidebarToggleService.setMarkerInfoSidebar(this.markerInfoSidebar);
    this.infoSidebarToggleService.close();
    // Subscribe to the marker click event
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
      this.mInfo = mInfo;
      // If MarkerInfo data is not empty, open sidebar
      if (Object.keys(this.mInfo.data).length > 0) {
        this.infoSidebarToggleService.open();
      }
    });
  }
}
