import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {InfoSidebar} from '../info-sidebar.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('markerInfoSidebar', {static: true}) markerInfoSidebar: InfoSidebar;
  @Input()mInfo: MarkerInfo;
  @Input()isOpened: boolean;

  constructor(private sharedService: SharedMarkerInfoService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              public infoSidebarToggleService: InfoSidebarToggleService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.infoSidebarToggleService.setMarkerInfoSidebar(this.markerInfoSidebar = new InfoSidebar());

    this.infoSidebarToggleService.sharedInfoSidebarState.subscribe(isOpened => {
      this.isOpened = isOpened;
    });
    this.infoSidebarToggleService.close();

    this.sharedService.sharedMarkerInfo.subscribe(mInfo => { // Subscribe to the marker click event
      this.mInfo = mInfo;
      if (Object.keys(this.mInfo.data).length > 0) { // If MarkerInfo data is not empty, open sidebar
        this.infoSidebarToggleService.open();
      }
    });
  }

  newInfoSidebarState(isOpened): void {
    this.infoSidebarToggleService.nextInfoSidebarState(isOpened);
  }
}
