import {Injectable, Optional} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker';
import {of} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {Feature} from '../feature';
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
      for (const feature of features) {
          const newFeature = new Feature(feature.geometry, feature.properties, feature.type);
          const marker = new Marker(newFeature);
          this.markerProviderService.MarkersCache.push(marker);
        }
      console.log('shared markers ', this.markerProviderService.MarkersCache);
      return this.markerProviderService.MarkersCache;
    }), share()); // Make an observable shareable between different components
  }

  // TODO: Return cashed markers
  getMarkers(): any {
    // Data available
    if (this.markerProviderService.MarkersCache) {
      console.log('Data available');
      return of(this.markerProviderService.MarkersCache);
    }
    // Request pending
    else if (this.markerProviderService.ObservableCache) {
      console.log('Request pending');
      return this.markerProviderService.ObservableCache;
    }
    // New request needed
    else {
      this.markerProviderService.ObservableCache = this.fetchMarkers();
      console.log('New request needed');
    }
    return this.markerProviderService.ObservableCache;
  }

}
