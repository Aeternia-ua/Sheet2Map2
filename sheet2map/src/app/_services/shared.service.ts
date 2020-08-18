import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MarkerInfo} from '../info-sidebar/info-item';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private mInfo = new BehaviorSubject<MarkerInfo>(
    new MarkerInfo(MarkerInfoComponent, {}));
  sharedMarkerInfo = this.mInfo.asObservable();

  constructor() { }

  nextMarkerInfo(mInfo: MarkerInfo): void {
    this.mInfo.next(mInfo);
  }
}
