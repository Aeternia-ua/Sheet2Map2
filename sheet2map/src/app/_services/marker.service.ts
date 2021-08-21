import {Injectable} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker.class';
import {forkJoin, Observable, ObservableInput, of} from 'rxjs';
import {concatMap, debounceTime, map, share, switchMap, tap} from 'rxjs/operators';
import {Feature} from '../feature.class';
import {MarkerProviderService} from './marker-provider.service';
import {GoogleSheetsService} from './google-sheets.service';
import {SpreadsheetTab} from '../spreadsheet-tab';
import {MarkerModel} from '../marker-model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  markers = [];
  tabs: SpreadsheetTab[];
  propertyOf = <TObj>(name: keyof TObj) => name;

  constructor(private jsonService: JsonService,
              private googleSheetsService: GoogleSheetsService,
              private markerProviderService: MarkerProviderService) {
  }

  public fetchMarkers(): any {
    return this.jsonService.getJson().pipe(map(json => {
      this.markerProviderService.MarkersCache = [];
      const features = json['features'];
      console.log(' fetchMarkers features ', features);
      features.forEach(feature => {
        const newFeature = new Feature(feature.geometry, feature.properties, feature.type);
        const marker = new Marker(newFeature);
        this.markerProviderService.MarkersCache.push(marker);
      })
      return this.markerProviderService.MarkersCache;
    }), share()); // Make an observable shareable between different components
  }

  private createMarkers(): void {
    this.markerProviderService.MarkersCache = [];
    // const markers: MarkerModel[] = [];
    this.tabs.forEach(tab => {
      const markersData = tab.Data;
      // console.log('markersData ', markersData);
      if (markersData) {
        markersData.forEach(markerData => {
          const properties = this.getMarkerProperties(markerData);
          const marker: MarkerModel = new MarkerModel([properties.gsx$lat.$t, properties.gsx$lon.$t], properties, [tab.Title, tab.Id, tab.Url]);
          this.markerProviderService.MarkersCache.push(marker);
          // markers.push(marker);
        });
      }
    });
    // console.log('markers ', this.markerProviderService.MarkersCache);
  }

  private getMarkerProperties(markerData): any {
    const properties = Object.keys(markerData).filter(key => String(key).startsWith('gsx$')).reduce((obj, key) => {
      return {
        ...obj,
      [key]: markerData[key]
      };
    }, {});
    // console.log('props ', properties);
    return properties;
  }

  public prepareMarkerData(): any {
    return this.googleSheetsService.getJson()
      .pipe(map(data => this.googleSheetsService
        .getSpreadsheetTabs(data, () => this.createMarkers())))
      .subscribe((tabs) => { this.tabs = tabs; });
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
      this.markerProviderService.ObservableCache = this.prepareMarkerData();
      // this.markerProviderService.ObservableCache = this.createMarkers();
      // this.markerProviderService.ObservableCache = this.fetchMarkers();
      // this.createMarkers();

    }
    // this.markerProviderService.ObservableCache.subscribe(test => {
    //     console.log("this.markerProviderService.ObservableCache ", test);
    //   });
    return this.markerProviderService.ObservableCache; // Return cashed markers
  }
}
