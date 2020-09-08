import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {InfoSidebarDirective} from '../_directives/info-sidebar.directive';
import {InfoComponent} from '../_interfaces/info.component';
import {MarkerInfo} from './info-item';
import {JsonService} from '../_services/json.service';
import {SharedMarkerInfoService} from '../_services/shared-marker-info.service';
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
              private sharedService: SharedMarkerInfoService,
              public viewContainerRef: ViewContainerRef,
              private changeDetectorRef: ChangeDetectorRef,
              private infoSidebarToggleService: InfoSidebarToggleService
              ) {
  }
  @ViewChild(InfoSidebarDirective, { static: true }) appInfoSidebar: InfoSidebarDirective;
  @Input()mInfo: MarkerInfo;

  ngOnInit(): void {
    this.sharedService.sharedMarkerInfo.subscribe(mInfo => {
        this.mInfo = mInfo;
        this.changeDetectorRef.markForCheck();
        this.loadMarkerInfoComponent();
        console.log(this.mInfo);
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

}
