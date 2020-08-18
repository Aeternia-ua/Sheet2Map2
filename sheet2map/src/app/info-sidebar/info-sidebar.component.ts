import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Directive, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {InfoComponent} from '../_interfaces/info.component';
import {MarkerInfo} from './info-item';
import {JsonService} from '../_services/json.service';
import { Globals } from '../globals';
import {SharedService} from '../_services/shared.service';
import {MatSidenav} from '@angular/material/sidenav';
import {InfoSidebarToggleService} from '../_services/info-sidebar-toggle.service';

@Component({
  selector: 'app-info-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css'],
})
export class InfoSidebarComponent implements OnInit {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private jsonService: JsonService,
              private sharedService: SharedService,
              public viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private infoSidebarToggleService: InfoSidebarToggleService
              ) {
  }
  @ViewChild(InfoSidebarDirective, { static: true }) appInfoSidebar: InfoSidebarDirective;
  @Input()mInfo: MarkerInfo;

  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;

  isOpened = false;

  ngOnInit(): void {
    this.buildInfoTemplate();
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
        this.mInfo = mInfo;
        this.changeDetectorRef.markForCheck();
        this.loadMarkerInfoComponent();
      }
    );
  }

  loadMarkerInfoComponent(): void {
    const markerInfo = this.mInfo;
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(markerInfo.component);
    const viewContainerRef = this.appInfoSidebar.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InfoComponent>(componentFactory);
    componentRef.instance.data = markerInfo.data;
  }

  private buildInfoTemplate(): void {
    this.jsonService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          // Passing JSON data to the json global variable
          this.features = jsonData['features'];
        }
    );
  }
}
