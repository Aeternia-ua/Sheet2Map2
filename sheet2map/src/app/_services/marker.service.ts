import {Injectable} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker.class';
import {Observable, of} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {Feature} from '../feature.class';
import {MarkerProviderService} from './marker-provider.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private jsonService: JsonService,
              private markerProviderService: MarkerProviderService) {
  }

  public fetchMarkers(): any {
    return this.jsonService.getJson().pipe(map(json => {
      this.markerProviderService.MarkersCache = [];
      const features = json['features'];
      // for (const feature of features) {
      features.forEach(feature => {
        const newFeature = new Feature(feature.geometry, feature.properties, feature.type);
        const marker = new Marker(newFeature);
        this.markerProviderService.MarkersCache.push(marker);
      })
      return this.markerProviderService.MarkersCache;
    }), share()); // Make an observable shareable between different components
  }

  getMarkers(): any {
    // Data available
    if (this.markerProviderService.MarkersCache) {
      return of(this.markerProviderService.MarkersCache);
    }
    // Request pending
    else if (this.markerProviderService.ObservableCache) {
      return this.markerProviderService.ObservableCache;
    }
    // New request needed
    else {
      this.markerProviderService.ObservableCache = this.fetchMarkers();
    }
    return this.markerProviderService.ObservableCache; // Return cashed markers
  }
}
