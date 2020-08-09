import { Injectable } from '@angular/core';
import { MarkerInfo } from '../info-sidebar/ad-item';
import { MarkerInfoComponent } from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class InfoSidebarService {
    getMarkerInfo(): MarkerInfo[] {
    return [

      new MarkerInfo(MarkerInfoComponent,   {headline: 'Successfully get MarkerInfo headline',
                                        body: 'Successfully get MarkerInfo body'}),

      new MarkerInfo(MarkerInfoComponent,   {headline: '22 Successfully get MarkerInfo headline',
                                        body: '22 Successfully get MarkerInfo body'})
    ];
  }
  constructor() { }
}
