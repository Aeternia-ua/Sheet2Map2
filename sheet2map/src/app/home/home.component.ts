import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MatSidenav} from '@angular/material/sidenav';
import {MarkerInfo} from '../info-sidebar/info-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('markerInfoSidebar', {static: true}) markerInfoSidebar: MatSidenav;
  @Input()mInfo: MarkerInfo;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private sharedService: SharedMarkerInfoService,
              private changeDetectorRef: ChangeDetectorRef,
              private infoSidebarToggleService: InfoSidebarToggleService) {}

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
