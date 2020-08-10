import { Injectable } from '@angular/core';
import { MarkerInfo } from '../info-sidebar/info-item';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class InfoSidebarService {

    getMarkerInfo2(el): MarkerInfo {
      const props = el.target.properties;
      console.log('getMarkerInfo2 el : ', el);
      return new MarkerInfo(MarkerInfo, props);
  }
      getMarkerInfo(): MarkerInfo[] {
    return [

      new MarkerInfo(MarkerInfoComponent,   {headline: 'Successfully get MarkerInfo headline',
                                        body: 'Successfully get MarkerInfo body'}),

      new MarkerInfo(MarkerInfoComponent,   {headline: '22 Successfully get MarkerInfo headline',
                                        body: '22 Successfully get MarkerInfo body'})
    ];
  }

// TODO On click - get getMarkerInfo2() of the marker
  populateInfoSidebar(marker): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

}

