import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InfoSidebarDirective} from '../directives/info-sidebar.directive';
import {InfoComponent} from '../interfaces/info.component';
import {MarkerInfo} from './ad-item';
import {DataModelService} from '../_services/data-model.service';
import {Globals} from '../globals';

@Component({
  selector: 'app-info-sidebar',
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css']
})
export class InfoSidebarComponent implements OnInit, OnDestroy {
  @Input() markersData: MarkerInfo[];
  currentMarkerInfoIndex = -1;
  @ViewChild(InfoSidebarDirective, {static: true}) appInfoSidebar: InfoSidebarDirective;
  // TODO remove test marker data displaying
  interval: any;

  public source = Globals.dataURL;
  private infoTemplate = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataModelService: DataModelService) { }

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

  // TODO rewrite method
  getMarkerInfo(): void {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

    private buildInfoTemplate(): void {
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          console.log('JSON data  ', jsonData);
          Globals.dataModel.fill(jsonData);
          this.loadComponent();
        }
    );
  }

}
