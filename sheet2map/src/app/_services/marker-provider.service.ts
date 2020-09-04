import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkerProviderService {
  private observableCache: Observable<any[]>;
  private markersCache: any[];

  constructor() { }

  get MarkersCache(): any {
    return this.markersCache;
  }

  set MarkersCache(markersCache: any) {
    this.markersCache = markersCache;
  }

  get ObservableCache(): any {
    return this.observableCache;
  }

  set ObservableCache(observableCache: any) {
    this.observableCache = observableCache;
  }
}
