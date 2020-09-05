import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

// In-memory caching data-provider service
@Injectable({
  providedIn: 'root'
})
export class MarkerProviderService {
  private observableCache: Observable<any[]>; // Store ongoing requests
  private markersCache: any[]; // Store received data

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
