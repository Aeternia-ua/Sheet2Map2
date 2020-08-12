import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {InfoSidebarDirective} from '../directives/info-sidebar.directive';
import {InfoComponent} from '../interfaces/info.component';
import {MarkerInfo} from './info-item';
import {DataModelService} from '../_services/data-model.service';
import { Globals } from '../globals';
import { InfoSidebarService } from '../_services/info-sidebar.service';
import {SharedService} from '../_services/shared.service';

@Component({
  selector: 'app-info-sidebar',
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css'],
})
export class InfoSidebarComponent implements AfterViewInit {
  // @ViewChild('appInfoSidebar', { static: false }) iSidebar: ViewContainerRef;
  @ViewChild(InfoSidebarDirective, {static: true}) appInfoSidebar: InfoSidebarDirective;

  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;
  markerInfo: MarkerInfo;
  private message: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataModelService: DataModelService,
              private sharedService: SharedService,
              // public viewContainerRef: ViewContainerRef,
              private infoSidebarService: InfoSidebarService
              ) {
  }

  ngAfterViewInit(): void {
    this.buildInfoTemplate();
    this.sharedService.sharedMarkerInfo.subscribe(message => this.message = message);
    console.log(this.message);
    console.log("InfoSidebarComponent infosidebar: ", this.appInfoSidebar);
    // this.loadComponent();
  }

  newMarkerInfo(): void {
    this.sharedService.nextMarkerInfo("Message from InfoSidebarComponent");
  }


  setMarkerInfo(markerInfo: MarkerInfo): void {
    this.markerInfo = markerInfo;
  }

  loadComponent(): void {

    // TODO implement sharing current markerInfo via shared service
    const markerInfo = this.markerInfo;
    console.log("loadComponent this.markerInfo", markerInfo.data);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(markerInfo.component);
    console.log('componentFactory ', componentFactory);
    // const ref = this.appInfoSidebar.createComponent(componentFactory);
    console.log('this.infoSidebar  ', this.appInfoSidebar);
    // const viewContainerRef = this.appInfoSidebar.viewContainerRef;
    // viewContainerRef.clear();
    // const componentRef = viewContainerRef.createComponent<InfoComponent>(componentFactory);
    // componentRef.instance.data = markerInfo.data;
  }

    private buildInfoTemplate(): void {
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          // Assigning JSON data to the json global variable
          this.features = jsonData['features'];
        }
    );
  }

}
