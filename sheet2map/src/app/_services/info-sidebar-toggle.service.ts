import { Injectable } from '@angular/core';
import {InfoSidebar} from '../info-sidebar.class';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MarkerInfo} from '../info-sidebar/marker-info.class';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class InfoSidebarToggleService {
  private markerInfoSidebar: InfoSidebar = new InfoSidebar();
  // private isOpened = new BehaviorSubject<boolean>(this.markerInfoSidebar.IsOpened);
  private isOpened = new BehaviorSubject<boolean>(null);
  sharedInfoSidebarState = this.isOpened.asObservable();

  constructor() { }

  public setMarkerInfoSidebar = (markerInfoSidebar): InfoSidebar => {
    return this.markerInfoSidebar = markerInfoSidebar;
  }
    // TODO Refactor logic of managing info sidebar state
    public open(): void  {
    this.markerInfoSidebar.IsOpened = true;
    this.isOpened.next(this.markerInfoSidebar.IsOpened);
    return this.markerInfoSidebar.open();
  }

  public close = (): void => {
    this.markerInfoSidebar.IsOpened = false;
    this.isOpened.next(this.markerInfoSidebar.IsOpened);
    return this.markerInfoSidebar.close();
  }

  public toggle(): void {
    this.isOpened.next(this.markerInfoSidebar.IsOpened = !this.markerInfoSidebar.IsOpened);
    return this.markerInfoSidebar.toggle();
  }

  nextInfoSidebarState(isOpened: boolean): void {
    this.isOpened.next(isOpened);
  }
}
