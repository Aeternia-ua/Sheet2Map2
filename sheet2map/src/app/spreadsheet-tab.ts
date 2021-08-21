export class SpreadsheetTab {

  constructor(private id: string,
              private title: string,
              private url: string,
              private data: any[],
              private headers: string[]){
  }

  get Id(): string {
    return this.id;
  }

  set Id(id: string) {
    this.id = id;
  }

  get Title(): string {
    return this.title;
  }

  set Title(title: string) {
    this.title = title;
  }

  get Url(): string {
    return this.url;
  }

  set Url(url: string) {
    this.url = url;
  }

  get Data(): any[] {
    return this.data;
  }

  set Data(data: any[]) {
    this.Data = data;
  }

  get Headers(): string[] {
    return this.headers;
  }

  set Headers(headers: string[]) {
    this.Headers = headers;
  }
}
