import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SpreadsheetTab} from '../spreadsheet-tab';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {TabDataResponse} from '../tab-data-response';
import { NgxXmlToJsonService } from 'ngx-xml-to-json';

@Injectable({
  providedIn: 'root'
})

export class GoogleSheetsService {
  private spreadsheetId = '1V4ebNbFS0ee0RkESJB_KZLkOG5mJlXglNx3LSSz16kc';
  private spreadsheetUrl: string;
  private json;
  private spreadsheetTab: SpreadsheetTab;
  private spreadsheetTabData;
  private tabsCount = 0;
  markers = [];

  options = { // set up the default options
    textKey: 'text', // tag name for text nodes
    attrKey: 'attr', // tag for attr groups
    cdataKey: 'cdata', // tag for cdata nodes (ignored if mergeCDATA is true)
  };

  constructor(private http: HttpClient,
              private ngxXmlToJsonService: NgxXmlToJsonService) {
  }

  // getJson = (): Observable<Response> => {
  //   this.spreadsheetUrl = this.getSpreadsheetUrl(this.spreadsheetId);
  //   return this.json = this.http.get<Response>(this.spreadsheetUrl)
  //     .pipe(map(response => {
  //       console.log('response ', response);
  //       return response;
  //     }));
  // }

  getJson = (): Observable<Response> => {
    this.spreadsheetUrl = this.getSpreadsheetUrl(this.spreadsheetId);
    return this.json = this.http.get<Response>(this.spreadsheetUrl)
      .pipe(map(response => {
        console.log('response ', response);
        return response;
      }));
  }

  // getSpreadsheetTabData = (tab): Observable<TabDataResponse> => {
  //   return this.spreadsheetTabData = this.http.get<Response>(tab.Url)
  //     .pipe(map(response => {
  //       return new TabDataResponse(tab, response);
  //     }));
  // }
  getSpreadsheetTabData = (tab): Observable<TabDataResponse> => { // Returns XML file
    return this.http.get<ArrayBuffer>(tab.Url, { observe: 'body', responseType: 'text'})
      .pipe(map(response => {
        // console.log('response tab', response);
        return new TabDataResponse(tab, response);
      }));
  }

  getSpreadsheetUrl(spreadsheetId): string { // Return a JSON with the IDs of all the tabs
    return 'https://spreadsheets.google.com/feeds/worksheets/' + spreadsheetId + '/public/full?alt=json';
  }

  getTabUrl(spreadsheetId, tabId): string {
    return 'https://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + tabId + '/public/full?return-empty=true';
  }

  // getTabUrl(spreadsheetId, tabId): string {
  //   return 'https://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + tabId + '/public/full?alt=json&?return-empty=true';
  // }

  // getTabUrl(spreadsheetId, tabId): string {
  //   return 'https://spreadsheets.google.com/feeds/cells/' + spreadsheetId + '/' + tabId + '/public/full?alt=json&?return-empty=true';
  // }

  public getSpreadsheetTabs(data, callback): SpreadsheetTab[] {
    const spreadsheetTabs: SpreadsheetTab[] = [];
    const tabs = data.feed.entry;
    tabs.forEach(tab => {
      this.spreadsheetTab = tab;
      const tabLink = tab.id.$t.split('/');
      this.spreadsheetTab.Title = tab.title.$t;
      this.spreadsheetTab.Id = tabLink[tabLink.length - 1];
      this.spreadsheetTab.Url = this.getTabUrl(this.spreadsheetId, this.spreadsheetTab.Id);
      spreadsheetTabs.push(this.spreadsheetTab);
    });

    this.tabsCount = spreadsheetTabs.length;
    spreadsheetTabs.forEach(tab => {
      this.spreadsheetTabData = this.getSpreadsheetTabData(tab);

      this.spreadsheetTabData.subscribe(tData => {

      const obj = this.ngxXmlToJsonService.xmlToJson(tData.Tab.Url, this.options);
      console.log(obj);

      console.log('tData  ', tData);


        const rows = [];
        let previousRow = 0; // Set initial previous row to check if the data in the current cell is from a new row
        const cells = tData.Response.feed.entry;
        cells.forEach(cell => {
          const latestRow = rows[rows.length - 1]; // Check what was the latest row added to the rows array
          // TODO: If the cell is empty, return an empty string
          const cellContent = cell.content.$t;
          // const df = pd.DataFrame(values);
          const row = cell.gs$cell.row;
          if (row > previousRow) { // If this is a new row, create new array for this row
            const newRow = [];
            newRow.push(cellContent);
            rows.push(newRow);
            previousRow++;
          }
          else { // If the cell is in an existing row, add cell content to this row
            latestRow.push(cellContent);
          }
        });
        tData.Tab.Data = rows;
        tData.Tab.Headers = rows[0];

        this.tabsCount--;
        if (this.tabsCount === 0) {
          callback();
        }
      });
    });
    console.log('spreadsheetTabs ', spreadsheetTabs);
    return spreadsheetTabs;
  }

//  private xmlToJson(xml) {
//   // Create the return object
//   var obj = {};
//
//   if (xml.nodeType == 1) {
//     // element
//     // do attributes
//     if (xml.attributes.length > 0) {
//       obj["@attributes"] = {};
//       for (var j = 0; j < xml.attributes.length; j++) {
//         var attribute = xml.attributes.item(j);
//         obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//       }
//     }
//   } else if (xml.nodeType == 3) {
//     // text
//     obj = xml.nodeValue;
//   }
//
//   // do children
//   // If all text nodes inside, get concatenated text from them.
//   var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
//     return node.nodeType === 3;
//   });
//   if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
//     obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
//       return text + node.nodeValue;
//     }, "");
//   } else if (xml.hasChildNodes()) {
//     for (var i = 0; i < xml.childNodes.length; i++) {
//       var item = xml.childNodes.item(i);
//       var nodeName = item.nodeName;
//       if (typeof obj[nodeName] == "undefined") {
//         obj[nodeName] = xmlToJson(item);
//       } else {
//         if (typeof obj[nodeName].push == "undefined") {
//           var old = obj[nodeName];
//           obj[nodeName] = [];
//           obj[nodeName].push(old);
//         }
//         obj[nodeName].push(xmlToJson(item));
//       }
//     }
//   }
//   return obj;
// }


  // public getSpreadsheetTabs(data, callback): SpreadsheetTab[] {
  //   const spreadsheetTabs: SpreadsheetTab[] = [];
  //   const entries = data.feed.entry;
  //   entries.forEach(entry => {
  //     this.spreadsheetTab = entry;
  //     const tabLink = entry.id.$t.split('/');
  //     this.spreadsheetTab.Title = entry.title.$t;
  //     this.spreadsheetTab.Id = tabLink[tabLink.length - 1];
  //     this.spreadsheetTab.Url = this.getTabUrl(this.spreadsheetId, this.spreadsheetTab.Id);
  //     spreadsheetTabs.push(this.spreadsheetTab);
  //   });
  //
  //   // TODO: Get spreadsheet tab data
  //   this.tabsCount = spreadsheetTabs.length;
  //   spreadsheetTabs.forEach(tab => {
  //     this.getSpreadsheetTabData(tab);
  //     this.spreadsheetTabData.subscribe(tData => {
  //       console.log('tData ', tData);
  //       tData.Tab.Data = tData.Response.feed.entry;
  //       this.tabsCount--;
  //       if (this.tabsCount === 0) {
  //         callback();
  //       }
  //     });
  //   });
  //   return spreadsheetTabs;
  // }


}
