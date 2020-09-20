import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MatSidenav} from '@angular/material/sidenav';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {FiltersComponent} from '../filters/filters.component';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {FiltersDirective} from '../_directives/filters.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('markerInfoSidebar', {static: true}) markerInfoSidebar: MatSidenav;
  @Input()mInfo: MarkerInfo;

  constructor(private breakpointObserver: BreakpointObserver,
              private sharedService: SharedMarkerInfoService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private infoSidebarToggleService: InfoSidebarToggleService) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.infoSidebarToggleService.setMarkerInfoSidebar(this.markerInfoSidebar);
    this.infoSidebarToggleService.close();
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => { // Subscribe to the marker click event
      this.mInfo = mInfo;
      if (Object.keys(this.mInfo.data).length > 0) { // If MarkerInfo data is not empty, open sidebar
        this.infoSidebarToggleService.open();
      }
    });
  }
}
