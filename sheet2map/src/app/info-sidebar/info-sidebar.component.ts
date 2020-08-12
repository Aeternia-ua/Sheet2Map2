import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, DoCheck, ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  SimpleChanges,
  ViewContainerRef,
  KeyValueChanges
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
export class InfoSidebarComponent implements OnInit, OnChanges {
  @ViewChild(InfoSidebarDirective, {static: true}) appInfoSidebar: InfoSidebarDirective;
  @Input() parentMInfo: MarkerInfo;
  mInfo: MarkerInfo;

  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;
  private markerInfo: MarkerInfo;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataModelService: DataModelService,
              private sharedService: SharedService,
              public viewContainerRef: ViewContainerRef,
              private infoSidebarService: InfoSidebarService
              ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.loadComponent();
  }

  ngOnInit(): void {
    this.buildInfoTemplate();
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => this.mInfo = mInfo);
    console.log("InfoSidebar comp data ", this.mInfo);
    this.loadComponent();

  }
  setMarkerInfo(markerInfo: MarkerInfo): void {
    this.markerInfo = markerInfo;
  }

  loadComponent(): void {

    // TODO implement sharing current markerInfo via shared service
    const markerInfo = this.mInfo;
    console.log("loadComponent this.markerInfo", markerInfo);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(markerInfo.component);
    console.log('this.infoSidebar  ', this.appInfoSidebar);
    const viewContainerRef = this.appInfoSidebar.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InfoComponent>(componentFactory);
    componentRef.instance.data = markerInfo.data;
    console.log("Comp instance data ", componentRef.instance.data);
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
