import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ChangeDetectionStrategy, ChangeDetectorRef
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css'],
})
export class InfoSidebarComponent implements OnInit {
  @ViewChild(InfoSidebarDirective, {static: true}) appInfoSidebar: InfoSidebarDirective;
  @Input()mInfo: MarkerInfo;

  public source = Globals.dataURL;
  public features: any[] = Globals.markersJson;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataModelService: DataModelService,
              private sharedService: SharedService,
              public viewContainerRef: ViewContainerRef,
              private infoSidebarService: InfoSidebarService,
              private changeDetectorRef: ChangeDetectorRef
              ) {
  }

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
    this.dataModelService.createJson(this.source)
      .subscribe(
        (jsonData) => {
          // Passing JSON data to the json global variable
          this.features = jsonData['features'];
        }
    );
  }
}
