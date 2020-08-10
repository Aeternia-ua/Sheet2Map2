import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InfoSidebarDirective} from '../directives/info-sidebar.directive';
import {InfoComponent} from '../interfaces/info.component';
import {MarkerInfo} from './info-item';
import {DataModelService} from '../_services/data-model.service';
import { Globals } from '../globals';
import { InfoSidebarService } from '../_services/info-sidebar.service';

@Component({
  selector: 'app-info-sidebar',
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css'],
})
export class InfoSidebarComponent implements OnInit, OnDestroy {
  @Input() markersData: MarkerInfo[];
  @Input() markerInfo: MarkerInfo[];
  currentMarkerInfoIndex = -1;
  @ViewChild(InfoSidebarDirective, {static: true}) appInfoSidebar: InfoSidebarDirective;
  // TODO remove test marker data displaying
  interval: any;

  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataModelService: DataModelService,
              private infoSidebarService: InfoSidebarService,
              ) {

  }

  ngOnInit(): void {
    this.buildInfoTemplate();
    this.getMarkerInfo();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

    loadComponent(): void {
    this.currentMarkerInfoIndex = (this.currentMarkerInfoIndex + 1) % this.markersData.length;
    // console.log("this.markersData ", this.markersData);
    const markerInfo = this.markersData[this.currentMarkerInfoIndex];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(markerInfo.component);
    const viewContainerRef = this.appInfoSidebar.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InfoComponent>(componentFactory);
    componentRef.instance.data = markerInfo.data;
  }

  // TODO remove method
  getMarkerInfo(): void {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

    private buildInfoTemplate(): void {
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          // Assigning the JSON data to the json global variable
          this.features = jsonData['features'];
          console.log('Globals.json ', this.features);
          // const test = this.infoSidebarService.getMarkerInfo2(jsonData);
          // console.log('infoSidebarService result ', test);
          this.loadComponent();
        }
    );
  }

}
