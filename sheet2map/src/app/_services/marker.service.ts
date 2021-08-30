import {Injectable} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker.class';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {concatMap, debounceTime, map, share, switchMap, tap} from 'rxjs/operators';
import {Feature} from '../feature.class';
import {MarkerProviderService} from './marker-provider.service';
import {GoogleSheetsService} from './google-sheets.service';
import {Sheet} from '../sheet';
import {MarkerModel} from '../marker-model';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private jsonService: JsonService,
              private googleSheetsService: GoogleSheetsService,
              private markerProviderService: MarkerProviderService) {
  }

  // markers = [];
  sheets: Sheet[];

  // public fetchMarkers2(): any {
  //   this.markerProviderService.MarkersCache = [];
  //   return this.googleSheetsService.getSheets()
  //       .pipe(map(sheets => {
  //           console.log("!!!fetchMarkers2 sheets ", sheets);
  //           console.log("!!!fetchMarkers2 sheets.length ", sheets.lenght);
            // const markers = this.createMarkers(sheets);
          // return this.markerProviderService.MarkersCache;
    // }), share()); // Make an observable shareable between different components
  // }

  private apiKey = 'AIzaSyA7Mvrt-40TlYzCdkfYIdgLbeBIbd0RKSM';
  private worksheetId = '193xVYQlUK5GxJFk12o-K7DnM98Y1j-sf6CjD6G6tP_Y';

  // public fetchMarkers(): any {
  //   return this.googleSheetsService.getJson().pipe(map(json => {
  //     this.markerProviderService.MarkersCache = [];
  //     const features = json['features'];
  //     console.log(' fetchMarkers features ', features);
  //     features.forEach(feature => {
  //       const newFeature = new Feature(feature.geometry, feature.properties, feature.type);
  //       const marker = new Marker(newFeature);
  //       this.markerProviderService.MarkersCache.push(marker);
  //     })
  //     return this.markerProviderService.MarkersCache;
  //   }), share()); // Make an observable shareable between different components
  // }

  // public fetchMarkers(): any {
  //   return this.jsonService.getJson().pipe(map(json => {
  //     this.markerProviderService.MarkersCache = [];
  //     const features = json['features'];
  //     // console.log(' fetchMarkers features ', features);
  //     features.forEach(feature => {
  //       const newFeature = new Feature(feature.geometry, feature.properties, feature.type);
  //       const marker = new Marker(newFeature);
  //       this.markerProviderService.MarkersCache.push(marker);
  //     })
  //     return this.markerProviderService.MarkersCache;
  //   }), share()); // Make an observable shareable between different components
  // }

  public fetchMarkers(): any {
    this.markerProviderService.MarkersCache = [];
    const sheetArray: Sheet[] = [];
    const obsOfObservables = this.googleSheetsService.getJson()
        .pipe(
            map(data => data['sheets'].map(sheet => (
                    this.googleSheetsService.getSheetUrl(this.worksheetId, sheet.properties.title, this.apiKey)
                ))),
            // map(data => data['sheets'].map(sheet => ({
            //         title: sheet.properties.title,
            //         url: this.getSheetUrl(this.worksheetId, sheet.properties.title, this.apiKey),
            //     }),
            //     )),
            map(sheet => sheet.map(sData => this.googleSheetsService.getSheetData(sData)))
        ).pipe(
       switchMap(observables => forkJoin(observables))
    );
    obsOfObservables.subscribe(
       sheetsData => { // do stuff with result
           sheetsData.forEach(sheetData => {
             const [, ...values] = sheetData['values']; // Get all the rows except header row
             const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
             const sheet = new Sheet("[Add]", "sheetUrl", nonEmptyValues, sheetData['values'][0]);
             sheetArray.push(sheet);
           });
           this.createMarkers(sheetArray);
           // this.markerProviderService.MarkersCache.push(markerArray);
           // console.log("fetchMarkers2 markerProviderService.MarkersCache ", this.markerProviderService.MarkersCache);
           }
    ),
  share(); // Make an observable shareable between different components
  }

  public createMarkers(sheets: Sheet[]): Marker[] {
    const markerArr: Marker[] = [];
    this.sheets = sheets;
    sheets.forEach(sheet => {
      if (sheet.Title.includes('[Add]')) { // If sheet should be added to map
        const props = this.getMarkerProperties(sheet.Headers, sheet.Values);
        props.forEach(featureProps => {
          const feature: Feature = new Feature([featureProps.Lat, featureProps.Lon],
              featureProps, 'marker', [sheet.Url, sheet.Title, sheet.Headers]);
          const marker = new Marker(feature);
          this.markerProviderService.MarkersCache.push(marker);
          markerArr.push(marker);
        });
      }
    });
    return markerArr;
  }


  // public prepareMarkerData(): Subscription {
  //   return this.googleSheetsService.getJson()
  //     // .pipe(map(data => this.googleSheetsService.getSheets(data, () => {
  //     //     this.createMarkers()))) // TODO: Fix callback issue
  //       .pipe(map(data => this.googleSheetsService.getSheets(data, () => {
  //         console.log("prepareMarkerData data", data);
  //           }
  //       )));
  //     // .subscribe((sheets) => {
  //     //   this.sheets = sheets;
  //
  //     // });
  // }

  private getMarkerProperties(keys, values): any[] {
    const mappedArr = [];
    values.forEach(value => {
      const localArr = [];
      keys.map((key, i) => { localArr[key] = value[i]; });
      mappedArr.push(localArr);
    });
    return mappedArr;
  }

  getMarkers(): Observable<Marker[]> {
    // Data available
    if (this.markerProviderService.MarkersCache) {
      // console.log("Data available ");
      return of(this.markerProviderService.MarkersCache);
    }
    // Request pending
    else if (this.markerProviderService.ObservableCache) {
      // console.log("Request pending ");
      return this.markerProviderService.ObservableCache;
    }
    // New request needed
    else {
      // console.log("New request needed ");
      // this.markerProviderService.ObservableCache = this.prepareMarkerData();
      // this.markerProviderService.ObservableCache = this.createMarkers();
      this.markerProviderService.ObservableCache = this.fetchMarkers();
      // this.createMarkers();

    }
    // this.markerProviderService.ObservableCache.subscribe(test => {
    //     console.log("this.markerProviderService.ObservableCache ", test);
    //   });
    console.log("of (this.markerProviderService.ObservableCache) ", of (this.markerProviderService.ObservableCache));
    return this.markerProviderService.ObservableCache; // Return cashed markers
  }
}
