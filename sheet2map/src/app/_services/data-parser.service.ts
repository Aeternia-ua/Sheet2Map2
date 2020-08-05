import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleSpreadsheet} from 'google-spreadsheet';

@Injectable({
  providedIn: 'root'
})
export class DataParserService {

  constructor(private http: HttpClient) { }
  // private spreadsheet: GoogleSpreadsheet;

  async getSpreadsheetData(): Promise<void> {
    console.log('getSpreadsheetData method starts');

    const { GoogleSpreadsheet } = require('google-spreadsheet');
    // spreadsheet key in the sheets URL
    const spreadsheet = new GoogleSpreadsheet('1kxlhZdLN-slX6Ehe8G5k4b_M-HJrSD86PX1keIPO7R0');
    console.log(spreadsheet);
    await spreadsheet.useServiceAccountAuth(require('../../assets/sheet-api/credentials.json'));
    await spreadsheet.loadInfo(); // load basic Spreadsheet document properties and child worksheets
    console.log(spreadsheet.title);

  }

}
