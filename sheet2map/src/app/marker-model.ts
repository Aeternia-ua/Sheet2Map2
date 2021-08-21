export class MarkerModel {

  constructor(
    private coordinates: number[],
    private properties: object,
    private spreadsheetTabProperties: string[]) {
  }

  get Coordinates(): number[] {
    return this.coordinates;
  }

  set Coordinates(coordinates: number[]) {
    this.coordinates = coordinates;
  }

  get Properties(): object {
    return this.properties;
  }

  set Properties(properties: object) {
    this.properties = properties;
  }

  get SpreadsheetTabProperties(): string[] {
    return this.spreadsheetTabProperties;
  }

  set SpreadsheetTabProperties(spreadsheetTabProperties: string[]) {
    this.spreadsheetTabProperties = spreadsheetTabProperties;
  }

}
