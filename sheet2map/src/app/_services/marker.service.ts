import {Injectable} from '@angular/core';
import {JsonService} from './json.service';
import {Marker} from '../marker.class';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {concatMap, debounceTime, map, mergeMap, share, switchMap, tap} from 'rxjs/operators';
import {Feature} from '../feature.class';
import {MarkerProviderService} from './marker-provider.service';
import {GoogleSheetsService} from './google-sheets.service';
import {Sheet} from '../sheet';
import {UserConfigService} from "./user-config.service";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private jsonService: JsonService,
              private googleSheetsService: GoogleSheetsService,
              private userConfigService: UserConfigService,
              private markerProviderService: MarkerProviderService) {
  }
  sheets: Sheet[];

  private apiKey = 'AIzaSyA7Mvrt-40TlYzCdkfYIdgLbeBIbd0RKSM';
  private worksheetId = '1_wtBSqbGEP1BuL-3-jmrQaIkrM9uX4yOA3qoK_6LaG0';

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
        // Find user configuration sheet and get lists of user sheets and filters
        // TODO: Move functions to separate service.
        // TODO: Catch exception
        const userConfigSheet = sheetObjects.find(sheetObject =>  sheetObject['title'] === 'Map Config');
        const userFilters = this.userConfigService.getUserFilters(userConfigSheet);
        console.log("userFilters ", userFilters);
        //  Get sheets that user selected to add to the map
        const userSheetsFilter = userFilters.find(userFilter => userFilter.Type === 'User Sheets');
        // const filteredSheetObjects = [];
        userSheetsFilter.Values.forEach(userSheet => {
            console.log("user sheet  ", userSheet);
            // Find sheetObject by name that matches sheet that user selected to add to the map
            const filteredSheetObject = sheetObjects.find(sheetObject => sheetObject['title'] === userSheet);
            console.log("filteredSheetObject  ", filteredSheetObject);
            const [, ...values] = filteredSheetObject['data']['values']; // Get all rows except header row
            const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
            const sheet = new Sheet(filteredSheetObject['title'], filteredSheetObject['url'], nonEmptyValues, filteredSheetObject['data']['values'][0]);
            sheets.push(sheet);
        });


        // sheetObjects.forEach(sheetObject => {
        //     if (sheetObject['title'] === 'Map Config') {
        //         this.userConfigService.getUserFilters(sheetObject);
        //     }
        //     else {
        //         const [, ...values] = sheetObject['data']['values']; // Get all rows except header row
        //         const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
        //         const sheet = new Sheet(sheetObject['title'], sheetObject['url'], nonEmptyValues, sheetObject['data']['values'][0]);
        //         sheets.push(sheet);
        //     }
        // });

        return this.markerProviderService.MarkersCache = this.createMarkers(sheets);
    }), share()); // Make an observable shareable between components
  }

  private createMarkers(sheets: Sheet[]): Marker[] {
    const markers: Marker[] = [];
    sheets.forEach(sheet => {
        const properties = this.getMarkerProperties(sheet.Headers, sheet.Values);
        properties.forEach(propertySet => {
            // If marker coordinates exist and marker should be shown on map
            if (propertySet['Show on map'] === 'TRUE' && propertySet.Lat && propertySet.Lon) {
                const latLon = {coordinates: {lat: propertySet.Lat, lng: propertySet.Lon}};
                const feature: Feature = new Feature(latLon,
                propertySet, 'marker', [sheet.Url, sheet.Title, sheet.Headers]);
                const marker = new Marker(feature);
                markers.push(marker);
            }
        });
    });
    return markers;
  }

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
