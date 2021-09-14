export class Sheet {

  constructor(private title: string,
              private url: string,
              private values: any[],
              private headers: string[],
              private userFilters: string[]){
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

  get Values(): any[] {
    return this.values;
  }

  set Values(values: any[]) {
    this.values = values;
  }

  get Headers(): string[] {
    return this.headers;
  }

  set Headers(headers: string[]) {
    this.headers = headers;
  }

  get UserFilters(): string[] {
    return this.userFilters;
  }

  set UserFilters(userFilters: string[]) {
    this.userFilters = userFilters;
  }
}
