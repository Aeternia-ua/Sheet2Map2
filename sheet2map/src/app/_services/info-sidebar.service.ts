import { Injectable } from '@angular/core';
import { MarkerInfo } from '../info-sidebar/info-item';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class InfoSidebarService {

    getMarkerInfo2(el): MarkerInfo {
      const props = el.target.properties;
      return new MarkerInfo(MarkerInfoComponent, { ...props });

  }

// TODO On click - get getMarkerInfo2() of the marker
  populateInfoSidebar(marker): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}

