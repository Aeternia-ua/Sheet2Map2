// import {SpreadsheetTab} from './spreadsheet-tab';
//
// export class TabDataResponse {
//   private tab: SpreadsheetTab;
//   private response: Response;
//   private callback: any;
//
//   constructor(tab: SpreadsheetTab, response: ArrayBuffer) {
//     this.tab = tab;
//     this.response = response;
//   }
//
//   get Tab(): SpreadsheetTab {
//     return this.tab;
//   }
//
//   get Response(): Response {
//     return this.response;
//   }
// }

import {Sheet} from './sheet';

export class TabDataResponse {
  private tab: Sheet;
  private response: Response;
  private callback: any;

  constructor(tab: Sheet, response: Response) {
    this.tab = tab;
    this.response = response;
  }

  get Tab(): Sheet {
    return this.tab;
  }

  get Response(): Response {
    return this.response;
  }
}
