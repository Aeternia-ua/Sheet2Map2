import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GoogleSheetsService {
  private apiKey = 'AIzaSyA7Mvrt-40TlYzCdkfYIdgLbeBIbd0RKSM'; /// TODO: Separate API key and sheet IDs to config file
  private worksheetId = '1_wtBSqbGEP1BuL-3-jmrQaIkrM9uX4yOA3qoK_6LaG0';
  private worksheetUrl: string;
  private json;
  private sheetData;

  constructor(private http: HttpClient) {
  }

  getJson = (): Observable<Response> => {
    this.worksheetUrl = this.getWorksheetUrl(this.worksheetId, this.apiKey);
    return this.json = this.http.get<Response>(this.worksheetUrl)
      .pipe(map(response => response));
  }

  getSheetData = (url): Observable<Response> => {
    return this.sheetData = this.http.get<Response>(url)
      .pipe(map(response => response));
  }

  getWorksheetUrl(worksheetId, apiKey): string { // Return a JSON with the IDs of all the tabs
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + worksheetId + '?fields=sheets.properties.title' + '&key='
        + apiKey;
  }

  getSheetUrl(worksheetId, sheetTitle, apiKey): string {
    return 'https://sheets.googleapis.com/v4/spreadsheets/' + worksheetId + '/values/' + sheetTitle
        + '?alt=json&key=' + apiKey;
  }

}
