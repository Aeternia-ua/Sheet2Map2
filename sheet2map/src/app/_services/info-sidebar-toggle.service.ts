import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class InfoSidebarToggleService {
  private markerInfoSidebar: MatSidenav;

  constructor() { }

  public setMarkerInfoSidebar(markerInfoSidebar: MatSidenav): void {
    this.markerInfoSidebar = markerInfoSidebar;
  }
    public open() {
    this.markerInfoSidebar.opened = true;
    return this.markerInfoSidebar.open();
  }

  public close() {
    return this.markerInfoSidebar.close();
  }

  public toggle() {
    return this.markerInfoSidebar.toggle();
  }
}
