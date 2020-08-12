import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MarkerInfo} from '../info-sidebar/info-item';
import {MarkerInfoComponent} from '../marker-info/marker-info.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private data = new BehaviorSubject<MarkerInfo>(
    new MarkerInfo(MarkerInfoComponent, {Facultet: 'Nothing selected'}));
  sharedMarkerInfo = this.data.asObservable();

  constructor() { }

  nextMarkerInfo(mInfo: MarkerInfo): void {
    this.data.next(mInfo);
  }
}
