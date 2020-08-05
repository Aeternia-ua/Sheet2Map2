import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataParserService} from '../_services/data-parser.service';
import {HttpClient} from '@angular/common/http';
import { GoogleSpreadsheet } from 'google-spreadsheet';

@Component({
  // selector: 'app-data-parser',
  templateUrl: './data-parser.component.html',
  styleUrls: ['./data-parser.component.css']
})
export class DataParserComponent implements OnInit {
  private http: HttpClient;
  // private spreadsheet = new GoogleSpreadsheet();


  constructor(http: HttpClient) {

  }

  ngOnInit(): void {
    console.log('Get into ngOnInit');
    this.accessSpreadsheet().then(r =>
    console.log('accessSpreadsheet method ended')
    );
  }
  private async accessSpreadsheet(): Promise<void> {
    // Startup logic here
    console.log('accessSpreadsheet method start');
    const {GoogleSpreadsheet} = require('google-spreadsheet');

    // const spreadsheet = new GoogleSpreadsheet('1kxlhZdLN-slX6Ehe8G5k4b_M-HJrSD86PX1keIPO7R0');
    // await spreadsheet.useServiceAccountAuth(require('../../assets/sheet-api/credentials.json'));

  }
}
