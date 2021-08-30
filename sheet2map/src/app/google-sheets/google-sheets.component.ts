import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Sheet} from '../sheet';

class Spreadsheet {
}

@Component({
  selector: 'app-google-sheets',
  templateUrl: './google-sheets.component.html',
  styleUrls: ['./google-sheets.component.css']
})
export class GoogleSheetsComponent implements OnInit {

  constructor(private googleSheetsDbService: GoogleSheetsDbService,
              private http: HttpClient) { }

  characters$: Observable<Spreadsheet[]>;
  spreadsheetId = '1V4ebNbFS0ee0RkESJB_KZLkOG5mJlXglNx3LSSz16kc';
  spreadsheetUrl: string;
  json;
  spreadsheetTab: Sheet;
  spreadsheetTabs: Sheet[] = [];
  spreadsheetTabData;

  getJson = (): Observable<Response> => {
    return this.json = this.http.get<Response>(this.spreadsheetUrl)
      .pipe(map(response => response));
  }

  // TODO: Rewrite methods for getting JSON
  getSpreadsheetTabData = (sourceUrl): Observable<Response> => {
    return this.spreadsheetTabData = this.http.get<Response>(sourceUrl)
      .pipe(map(response => response));
  }

  // Return a JSON with the IDs of all the tabs
  getSpreadsheetUrl(spreadsheetId): string {
    return 'https://spreadsheets.google.com/feeds/worksheets/' + spreadsheetId + '/public/full?alt=json';
  }

  getTabUrl(spreadsheetId, tabId): string {
    return 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/' + tabId + '/public/full?alt=json';
  }

  ngOnInit(): void {
    // this.spreadsheetUrl = this.getSpreadsheetUrl(this.spreadsheetId);
    this.getJson();

    // this.json.subscribe(json => {
    //   const entry = json.feed.entry;
    //   entry.forEach(tab => {
    //     this.spreadsheetTab = tab;
    //     this.spreadsheetTab.Title = tab.title.$t;
    //     const tabLink = tab.id.$t.split('/');
    //     this.spreadsheetTab.Id = tabLink[tabLink.length - 1];
    //     this.spreadsheetTab.Url = this.getTabUrl(this.spreadsheetId, this.spreadsheetTab.Id);
    //     this.spreadsheetTabs.push(this.spreadsheetTab);
    //   });
    //
    //   this.spreadsheetTabs.forEach(tab => {
    //     this.getSpreadsheetTabData(tab.Url);
    //     this.spreadsheetTabData.subscribe(data => {
    //       tab.Data = data.feed.entry;
    //     });
    //   });
    //   console.log('spreadsheetTabs ', this.spreadsheetTabs);
    // });


  }
}
