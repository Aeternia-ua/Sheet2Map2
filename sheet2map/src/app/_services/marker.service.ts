import {Injectable} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker.class';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {concatMap, debounceTime, map, mergeMap, share, switchMap, tap} from 'rxjs/operators';
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

  public fetchMarkers2(): any {
    return this.jsonService.getJson().pipe(
        map(json => {
          this.markerProviderService.MarkersCache = [];
          const features = json['features'];
          features.forEach(feature => {
            const newFeature = new Feature(feature.geometry, feature.properties, feature.type, null);
            const marker = new Marker(newFeature);
            this.markerProviderService.MarkersCache.push(marker);
          })
          return this.markerProviderService.MarkersCache;
        }), share()); // Make an observable shareable between different components
  }

  public fetchMarkers(): any {
    const sheets: Sheet[] = [];
    return this.googleSheetsService.getJson()
        .pipe(
            map(data => data['sheets'].map(sheetRef => ({
                    title: sheetRef.properties.title,
                    url: this.googleSheetsService.getSheetUrl(this.worksheetId, sheetRef.properties.title, this.apiKey),
            }))),
            map(sheetRef => sheetRef.map(sheet => (
                this.googleSheetsService.getSheetData(sheet.url)
                    .pipe(map(response => { sheet.data = response; return sheet; } ))
            ))),
        ).pipe(
       switchMap(observables => forkJoin(observables))).pipe(map(sheetObjects => {
        this.markerProviderService.MarkersCache = [];
        sheetObjects.forEach(sheetObject => {
            const [, ...values] = sheetObject['data']['values']; // Get all rows except header row
            const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
            const sheet = new Sheet(sheetObject['title'], sheetObject['url'], nonEmptyValues, sheetObject['data']['values'][0]);
            sheets.push(sheet);
        });
        console.log("sheets ", sheets);
        return this.markerProviderService.MarkersCache = this.createMarkers(sheets);
    }), share());

    //     .pipe(
    //    switchMap(observables => forkJoin(observables))
    //         ).pipe(map(sheetsData => {
    //     this.markerProviderService.MarkersCache = [];
    //     console.log("sheetsData ", sheetsData);
    //     sheetsData.forEach(sheetData => {
    //         const [, ...values] = sheetData['values']; // Get all rows except header row
    //         const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
    //         const sheet = new Sheet('[Add]', 'sheetUrl', nonEmptyValues, sheetData['values'][0]);
    //         sheets.push(sheet);
    //     });
    //     return this.markerProviderService.MarkersCache = this.createMarkers(sheets);
    // }), share());

    // ).pipe(map(sheetsData => {
    //     this.markerProviderService.MarkersCache = [];
    //     sheetsData.forEach(sheetData => {
    //         console.log("sheetsData ", sheetsData);
    //         const [, ...values] = sheetData['values']; // Get all rows except header row
    //         const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
    //         const sheet = new Sheet('[Add]', 'sheetUrl', nonEmptyValues, sheetData['values'][0]);
    //         sheets.push(sheet);
    //     });
    //     return this.markerProviderService.MarkersCache = this.createMarkers(sheets);
    // }), share());
    // obsOfObservables.subscribe(sheetsData => { // Create array of sheets
    //      this.markerProviderService.MarkersCache = [];
    //      sheetsData.forEach(sheetData => {
    //          const [, ...values] = sheetData['values']; // Get all rows except header row
    //          const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
    //          const sheet = new Sheet('[Add]', 'sheetUrl', nonEmptyValues, sheetData['values'][0]);
    //          sheets.push(sheet);
    //      });
    //      return this.markerProviderService.MarkersCache = this.createMarkers(sheets);
    //      }, share()); // Make an observable shareable between different components
  }

  private createMarkers(sheets: Sheet[]): Marker[] {
    const markers: Marker[] = [];
    sheets.forEach(sheet => {
      if (sheet.Title.includes('[Add]')) { // If sheet should be added to map
        const properties = this.getMarkerProperties(sheet.Headers, sheet.Values);
        properties.forEach(propertySet => {
            const latLon = {coordinates: {lat: propertySet.Lat, lng: propertySet.Lon}};
            const feature: Feature = new Feature(latLon,
              propertySet, 'marker', [sheet.Url, sheet.Title, sheet.Headers]);
            const marker = new Marker(feature);
            markers.push(marker);
        });
      }
    });
    return markers;
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
    if (this.markerProviderService.MarkersCache) { // Data available
      console.log("Data available ");
      return of(this.markerProviderService.MarkersCache);
    }
    else if (this.markerProviderService.ObservableCache) { // Request pending
      console.log("Request pending ");
      return this.markerProviderService.ObservableCache;
    }
    else { // New request needed
      console.log("New request needed ");
      this.markerProviderService.ObservableCache = this.fetchMarkers();

    }
    return this.markerProviderService.ObservableCache; // Return cashed markers
  }
}
