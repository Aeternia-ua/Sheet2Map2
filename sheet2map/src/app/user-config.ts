export class UserFilter { // TODO: Move class
      constructor(private type: string,
                  private values: string[]) {}

  get Type(): string {
    return this.type;
  }

  set Type(type: string) {
    this.type = type;
  }

  get Values(): string[] {
          return this.values;
  }

  set Values(values: string[]) {
          this.values = values;
  }
}
