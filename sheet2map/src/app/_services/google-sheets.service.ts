import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sheet} from '../sheet';
import {forkJoin, Observable, of, Subject, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {MarkerService} from "./marker.service";
import {Marker} from "../marker.class";
import {Feature} from "../feature.class";

@Injectable({
  providedIn: 'root'
})

export class GoogleSheetsService {
  private apiKey = 'AIzaSyA7Mvrt-40TlYzCdkfYIdgLbeBIbd0RKSM';
  private worksheetId = '193xVYQlUK5GxJFk12o-K7DnM98Y1j-sf6CjD6G6tP_Y';
  private worksheetUrl: string;
  private json;
  private sheetData;

  constructor(private http: HttpClient) {
  }

  getJson = (): Observable<Response> => {
    this.worksheetUrl = this.getWorksheetUrl(this.worksheetId, this.apiKey);
    return this.json = this.http.get<Response>(this.worksheetUrl)
      .pipe(map(response => {
        return response;
      }));
  }

  getSheetData = (url): Observable<Response> => {
    return this.sheetData = this.http.get<Response>(url)
      .pipe(map(response => {
        // return new TabDataResponse(tab, response);
        return response;
      }));
  }

  getWorksheetUrl(worksheetId, apiKey): string { // Return a JSON with the IDs of all the tabs
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + worksheetId + '?fields=sheets.properties.title' + '&key='
        + apiKey;
  }

  getSheetUrl(worksheetId, sheetTitle, apiKey): string {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + worksheetId + '/values/' + sheetTitle
        + '?alt=json&key=' + apiKey;
  }

  // public getSheets(data): Observable<Sheet[]> {
  //   const sheetArray: Sheet[] = [];
  //   data.sheets.forEach(sheet => {
  //       const sheetTitle = sheet.properties.title;
  //       const sheetUrl = this.getSheetUrl(this.worksheetId, sheetTitle, this.apiKey); // TODO: fix worksheetId variable
  //       this.getSheetData(sheetUrl).subscribe(shData => {
  //         const [, ...values] = shData['values']; // Get all the rows except header row
  //         const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
  //         const sheetObject = new Sheet(sheetTitle, sheetUrl, nonEmptyValues, shData['values'][0]);
  //         sheetArray.push(sheetObject);
  //       });
  //   });
  //   console.log("sheetArray length", sheetArray.length);
  //   return of (sheetArray);
  //   }
  // private testGetMarkerProperties(keys, values): any[] {
  //   const mappedArr = [];
  //   values.forEach(value => {
  //     const localArr = [];
  //     keys.map((key, i) => { localArr[key] = value[i]; });
  //     mappedArr.push(localArr);
  //   });
  //   return mappedArr;
  // }
  //
  // private testCreateMarkers(sheets: Sheet[]): Marker[] {
  //   console.log("test createMarkers  sheets length", sheets.length);
  //   const markerArr: Marker[] = [];
  //   sheets.forEach(sheet => {
  //     if (sheet.Title.includes('[Add]')) { // If sheet should be added to map
  //       const props = this.testGetMarkerProperties(sheet.Headers, sheet.Values);
  //       console.log("test createMarkers props ", props);
  //       props.forEach(featureProps => {
  //         const feature: Feature = new Feature([featureProps.Lat, featureProps.Lon], featureProps, 'marker', [sheet.Url, sheet.Title, sheet.Headers]);
  //         const marker = new Marker(feature);
  //         // this.markerProviderService.MarkersCache.push(marker);
  //         markerArr.push(marker);
  //       });
  //     }
  //   });
  //   console.log("test markerArr ", markerArr);
  //   return markerArr;
  // }

  public getSheets(): Observable<Sheet[]> {
    const sheetArray: Sheet[] = [];

    const obsOfObservables = this.getJson()
        .pipe(
            map(data => data['sheets'].map(sheet => (
                    this.getSheetUrl(this.worksheetId, sheet.properties.title, this.apiKey)
                ))),
            // map(data => data['sheets'].map(sheet => ({
            //         title: sheet.properties.title,
            //         url: this.getSheetUrl(this.worksheetId, sheet.properties.title, this.apiKey),
            //     }),
            //     )),
            map(sheet => sheet.map(sData => this.getSheetData(sData)))
        ).pipe(
       switchMap(observables => forkJoin(observables))
    );
    obsOfObservables.subscribe(
       sheetData => { // do stuff with result
           sheetData.forEach(el => {
             const [, ...values] = el['values']; // Get all the rows except header row
             const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
             const sheetObject = new Sheet("[Add]", "sheetUrl", nonEmptyValues, el['values'][0]);
             sheetArray.push(sheetObject);
           });
           this.testCreateMarkers(sheetArray);
           }
    );
    return of(sheetArray);
    // data.sheets.forEach(sheet => {
    //   const sheetTitle = sheet.properties.title;
    //   const sheetUrl = this.getSheetUrl(this.worksheetId, sheetTitle, this.apiKey); // TODO: fix worksheetId variable
    //   sheetUrls.push(sheetUrl);
    // });
    // sheetUrls.map(res => {
    //             return res;
    //         })
    //     .map(urls => forkJoin(urls.map(this.getSheetData(urls))));

    // this.getSheetData(sheetUrl).subscribe(shData => {
    //     const [, ...values] = shData['values']; // Get all the rows except header row
    //     const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
    //     const sheetObject = new Sheet(sheetTitle, sheetUrl, nonEmptyValues, shData['values'][0]);
    //     sheetArray.push(sheetObject);
    //   });
    // console.log("sheetArray length", sheetArray.length);
    // return of(sheetArray);
    // data.sheets.forEach(sheet => {
    //     const sheetTitle = sheet.properties.title;
    //     const sheetUrl = this.getSheetUrl(this.worksheetId, sheetTitle, this.apiKey); // TODO: fix worksheetId variable
    //     this.getSheetData(sheetUrl).subscribe(shData => {
    //       const [, ...values] = shData['values']; // Get all the rows except header row
    //       const nonEmptyValues = values.filter(e => e.length !== 0); // Remove empty rows
    //       const sheetObject = new Sheet(sheetTitle, sheetUrl, nonEmptyValues, shData['values'][0]);
    //       sheetArray.push(sheetObject);
    //     });
    // });
    // console.log("sheetArray length", sheetArray.length);
    // return of(sheetArray);
  }

}
