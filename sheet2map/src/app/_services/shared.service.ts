import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MarkerInfo} from '../info-sidebar/info-item';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private message = new BehaviorSubject('First Message');
  sharedMarkerInfo = this.message.asObservable();

  constructor() { }

  nextMarkerInfo(message: string) {
    this.message.next(message);
  }
}
