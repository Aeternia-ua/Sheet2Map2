import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
import {DataParserService} from '../_services/data-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {

  // spreadsheet: GoogleSpreadsheet;
  private spreadsheet = 'spreadsheet content';
  private dataParserService: DataParserService;
  // private zone: NgZone;

  constructor(dataParserService: DataParserService,
              private zone: NgZone) {
    this.dataParserService = dataParserService;
  }

ngOnInit(): void {
    console.log('Get into ngOnInit');
    // this.dataParserService.getSpreadsheetData(this.spreadsheet).then(r =>
    // this.dataParserService.getSpreadsheetData().then(r =>
    // this.zone.run(() => this.dataParserService.getSpreadsheetData(this.spreadsheet));
    // console.log(this.spreadsheet.title);
    console.log(this.spreadsheet);
    // );
    console.log('Out of ngOnInit');
  }

}
