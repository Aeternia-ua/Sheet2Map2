import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { InfoSidebarService } from './_services/info-sidebar.service';
import {MarkerInfo} from './info-sidebar/info-item';
import {SharedService} from './_services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'sheet2map';
  public appTemplate = 'leaflet-template';
  markerInfo: typeof MarkerInfo;
  mInfo: MarkerInfo;

  constructor(private sharedService: SharedService,
              private componentFactoryResolver: ComponentFactoryResolver,
              public viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
      this.mInfo = mInfo;
      console.log('New data arrived');
      console.log("App component mInfo is ", mInfo);
    });

  }

  toggleAppTemplate(): void {
    this.appTemplate = this.appTemplate === 'agm-template' ? 'leaflet-template' : 'agm-template';
  }
}


